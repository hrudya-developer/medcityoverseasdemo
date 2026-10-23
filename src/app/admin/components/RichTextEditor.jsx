"use client";

import { useRef, useState } from "react";

import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { uploadImage } from "./uploadImage";

function ToolButton({ active, disabled, onClick, children, title }) {
    return (
        <button
            type="button"
            title={title}
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onClick}
            className={`rounded px-2 py-1 text-sm font-semibold disabled:opacity-40 ${
                active ? "bg-blue-700 text-white" : "text-slate-700 hover:bg-slate-200"
            }`}
        >
            {children}
        </button>
    );
}

function Divider() {
    return <span className="mx-1 h-5 w-px bg-slate-300" />;
}

/** Formatting buttons; their lit-up state follows the cursor. */
function Toolbar({ editor, linkOpen, onToggleLink, uploading, onPickImage }) {
    const state = useEditorState({
        editor,
        selector: ({ editor: current }) => ({
            h2: current.isActive("heading", { level: 2 }),
            h3: current.isActive("heading", { level: 3 }),
            bold: current.isActive("bold"),
            italic: current.isActive("italic"),
            underline: current.isActive("underline"),
            bullet: current.isActive("bulletList"),
            ordered: current.isActive("orderedList"),
            quote: current.isActive("blockquote"),
            link: current.isActive("link"),
            table: current.isActive("table"),
            canUndo: current.can().undo(),
            canRedo: current.can().redo(),
        }),
    });

    const chain = () => editor.chain().focus();

    return (
        <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 rounded-t-lg border-b border-slate-200 bg-slate-50 p-2">
            <ToolButton title="Heading" active={state.h2} onClick={() => chain().toggleHeading({ level: 2 }).run()}>
                H2
            </ToolButton>
            <ToolButton title="Subheading" active={state.h3} onClick={() => chain().toggleHeading({ level: 3 }).run()}>
                H3
            </ToolButton>
            <Divider />
            <ToolButton title="Bold" active={state.bold} onClick={() => chain().toggleBold().run()}>
                B
            </ToolButton>
            <ToolButton title="Italic" active={state.italic} onClick={() => chain().toggleItalic().run()}>
                <em>I</em>
            </ToolButton>
            <ToolButton title="Underline" active={state.underline} onClick={() => chain().toggleUnderline().run()}>
                <u>U</u>
            </ToolButton>
            <Divider />
            <ToolButton title="Bullet list" active={state.bullet} onClick={() => chain().toggleBulletList().run()}>
                • List
            </ToolButton>
            <ToolButton title="Numbered list" active={state.ordered} onClick={() => chain().toggleOrderedList().run()}>
                1. List
            </ToolButton>
            <ToolButton title="Quote" active={state.quote} onClick={() => chain().toggleBlockquote().run()}>
                Quote
            </ToolButton>
            <Divider />
            <ToolButton title="Link" active={state.link || linkOpen} onClick={onToggleLink}>
                Link
            </ToolButton>
            <ToolButton title="Insert image" disabled={uploading} onClick={onPickImage}>
                {uploading ? "Uploading..." : "Image"}
            </ToolButton>
            <ToolButton
                title="Insert table"
                active={state.table}
                onClick={() => chain().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            >
                Table
            </ToolButton>
            <Divider />
            <ToolButton title="Undo" disabled={!state.canUndo} onClick={() => chain().undo().run()}>
                Undo
            </ToolButton>
            <ToolButton title="Redo" disabled={!state.canRedo} onClick={() => chain().redo().run()}>
                Redo
            </ToolButton>
        </div>
    );
}

/** Row and column buttons, shown while the cursor is in a table. */
function TableBar({ editor }) {
    const inTable = useEditorState({
        editor,
        selector: ({ editor: current }) => current.isActive("table"),
    });

    if (!inTable) {
        return null;
    }

    const chain = () => editor.chain().focus();

    return (
        <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-blue-50 px-2 py-1 text-xs">
            <span className="mr-1 font-semibold text-slate-600">Table:</span>
            <ToolButton title="Add row below" onClick={() => chain().addRowAfter().run()}>+ Row</ToolButton>
            <ToolButton title="Add column right" onClick={() => chain().addColumnAfter().run()}>+ Column</ToolButton>
            <ToolButton title="Delete row" onClick={() => chain().deleteRow().run()}>− Row</ToolButton>
            <ToolButton title="Delete column" onClick={() => chain().deleteColumn().run()}>− Column</ToolButton>
            <ToolButton title="Delete table" onClick={() => chain().deleteTable().run()}>Delete table</ToolButton>
        </div>
    );
}

/**
 * Description (alt text) for the selected picture. Search engines and
 * screen readers rely on it, so the editor asks for it on every image.
 */
function ImageAltBar({ editor }) {
    const image = useEditorState({
        editor,
        selector: ({ editor: current }) =>
            current.isActive("image") ? current.getAttributes("image").alt || "" : null,
    });

    if (image === null) {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-amber-50 px-2 py-1.5">
            <label className="flex min-w-0 flex-1 items-center gap-2 text-xs font-semibold text-slate-700">
                Picture description
                <input
                    type="text"
                    value={image}
                    maxLength={200}
                    placeholder="What the picture shows, e.g. Students at TU Munich campus"
                    onChange={(event) =>
                        editor.chain().updateAttributes("image", { alt: event.target.value }).run()
                    }
                    className="min-w-0 flex-1 rounded border border-slate-300 bg-white px-2 py-1 text-sm font-normal"
                />
            </label>
        </div>
    );
}

/**
 * Word-processor style editor for blog posts. Produces plain article HTML
 * (headings, paragraphs, lists, links, images), which the server cleans
 * again before saving.
 */
export default function RichTextEditor({ value, onChange }) {
    const fileInput = useRef(null);

    const [linkUrl, setLinkUrl] = useState("");
    const [showLink, setShowLink] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3] },
                link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
            }),
            Image,
            TableKit.configure({ table: { resizable: false } }),
        ],
        content: value || "",
        editorProps: {
            attributes: {
                class: "blog-body blog-editor min-h-[420px] px-4 py-3 font-normal outline-none",
            },
        },
        onUpdate: ({ editor: current }) => onChange(current.getHTML()),
    });

    if (!editor) {
        return <div className="min-h-[470px] rounded-lg border border-slate-300 bg-white" />;
    }

    function applyLink(event) {
        event.preventDefault();

        const url = linkUrl.trim();
        const chain = editor.chain().focus().extendMarkRange("link");

        if (!url) {
            chain.unsetLink().run();
        } else {
            const href = /^(https?:|mailto:|tel:)/i.test(url) ? url : `https://${url}`;

            chain.setLink({ href }).run();
        }

        setShowLink(false);
        setLinkUrl("");
    }

    async function insertImage(event) {
        const file = event.target.files?.[0];

        event.target.value = "";

        if (!file) {
            return;
        }

        setUploading(true);
        setError("");

        try {
            const image = await uploadImage(file);

            editor.chain().focus().setImage({ src: image.url, alt: "" }).run();

            // Select the new picture so its description box opens.
            editor.state.doc.descendants((node, position) => {
                if (node.type.name === "image" && node.attrs.src === image.url) {
                    editor.commands.setNodeSelection(position);
                    return false;
                }

                return true;
            });
        } catch (uploadError) {
            setError(uploadError.message);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="rounded-lg border border-slate-300 bg-white">
            <Toolbar
                editor={editor}
                linkOpen={showLink}
                uploading={uploading}
                onPickImage={() => fileInput.current?.click()}
                onToggleLink={() => {
                    setLinkUrl(editor.getAttributes("link").href || "");
                    setShowLink((open) => !open);
                }}
            />

            <TableBar editor={editor} />
            <ImageAltBar editor={editor} />

            <input
                ref={fileInput}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                className="hidden"
                onChange={insertImage}
            />

            {showLink && (
                <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 p-2">
                    <input
                        type="text"
                        value={linkUrl}
                        placeholder="https://..."
                        autoFocus
                        onChange={(event) => setLinkUrl(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                applyLink(event);
                            }
                        }}
                        className="min-w-0 flex-1 rounded border border-slate-300 px-2 py-1 text-sm font-normal"
                    />
                    <button type="button" onClick={applyLink} className="rounded bg-blue-700 px-3 py-1 text-sm text-white">
                        Apply
                    </button>
                    <span className="text-xs font-normal text-slate-500">Leave empty and apply to remove the link.</span>
                </div>
            )}

            {error && <p className="px-4 pt-2 text-sm text-red-600">{error}</p>}

            <EditorContent editor={editor} />
        </div>
    );
}
