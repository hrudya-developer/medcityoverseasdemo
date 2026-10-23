import "server-only";

import { query } from "@/lib/db";
import { imagePath, toId, today } from "./util";

/*
 * Public content endpoints, ported one-to-one from the Laravel
 * ApiController so every response keeps the exact shape the website
 * (and later the mobile apps) already expect.
 */

const UNIVERSITY_CARD =
    "u.id, u.name, u.location, u.logo, d.flag";

async function rankedUniversities(destinationId) {
    return query(
        `SELECT ${UNIVERSITY_CARD}
         FROM tb_universities u
         JOIN tb_destinations d ON d.id = u.d_id
         WHERE u.d_id = ? AND u.\`rank\` != ''
         ORDER BY u.\`rank\` ASC
         LIMIT 20`,
        [destinationId]
    );
}

export async function getHomeResponses(input) {
    const uid = input.uid ?? "";

    const [
        homeTiles,
        destinations,
        universities,
        mainCourses,
        rank1,
        rank2,
        rank3,
        rank4,
        rank5,
        visa,
        placement,
        shorts,
        testimonial,
        chat,
        sliders,
        adSliders,
        blog,
        services,
        contacts,
    ] = await Promise.all([
        query("SELECT * FROM tb_home_tile WHERE status = '1' ORDER BY `order` ASC"),
        query("SELECT id, country, flag, image FROM tb_destinations WHERE status = '1' ORDER BY `order` ASC"),
        query("SELECT id, d_id, name, location, logo FROM tb_universities WHERE `rank` != '' AND status = '1' ORDER BY `order` DESC LIMIT 10"),
        query("SELECT * FROM tb_main_course WHERE popular = 'true' ORDER BY `order` ASC"),
        rankedUniversities("6"),
        rankedUniversities("1"),
        rankedUniversities("7"),
        rankedUniversities("2"),
        rankedUniversities("16"),
        query("SELECT * FROM tb_visa_approved ORDER BY RAND() LIMIT 20"),
        query("SELECT * FROM tb_visa_approved ORDER BY RAND() LIMIT 20"),
        query("SELECT * FROM tb_shorts WHERE status = '1' ORDER BY id DESC"),
        query("SELECT * FROM tb_testimonial WHERE status = '1' ORDER BY created_at DESC"),
        query("SELECT * FROM tb_chat WHERE uid = ? AND seen = 'no' AND type = 'receive'", [String(uid)]),
        query("SELECT * FROM tb_sliders WHERE status = '1' AND type = 'course'"),
        query("SELECT * FROM tb_sliders WHERE status = '1' AND type = 'ad'"),
        query("SELECT * FROM tb_blog WHERE status = '1' ORDER BY created_at DESC"),
        query("SELECT * FROM tb_services WHERE status = '1'"),
        query("SELECT * FROM app_contacts"),
    ]);

    return {
        hometile_image_path: imagePath(""),
        destinations_image_path: imagePath("destinations/"),
        universities_image_path: imagePath("university/"),
        maincourse_image_path: imagePath("icons/"),
        course_image_path: imagePath("courses/"),
        visa_image_path: imagePath("visa/"),
        services_image_path: imagePath("services/"),
        slider_image_path: imagePath("slider/"),
        blog_image_path: imagePath("blog/"),
        shorts_path: imagePath("shorts/"),
        testimonial_path: imagePath("testimonial/"),
        selfprepad: imagePath("services/onlinegerman.jpeg"),
        ieltsappad: imagePath("services/ieltsad.jpeg"),
        germanappad: imagePath("services/germanappad.jpeg"),
        oetappad: imagePath("services/oetappad.jpeg"),
        flightticketad: imagePath("services/flightticketad.jpeg"),
        visaad: imagePath("services/visaadnew.jpeg"),
        accommodationad: imagePath("services/accommodationad.jpeg"),
        mbbsad: imagePath("services/mbbsadnew.jpeg"),
        loanad: imagePath("services/eduloanad.jpeg"),
        ausbildungad: imagePath("services/aubildungad.jpeg"),
        longad: imagePath("services/longad.jpeg"),
        home_tile_status: true,
        home_tile_new: homeTiles,
        destinations,
        universities,
        maincourse: mainCourses,
        rank1name: "Best Universities in Germany",
        rank1,
        rank2name: "Best Universities in Australia",
        rank2,
        rank3name: "Best Universities in Ireland",
        rank3,
        rank4name: "Best Universities in UK",
        rank4,
        rank5name: "Best Universities in Malta",
        rank5,
        placement_status: true,
        studentvisa_status: true,
        visa,
        placement_details: placement,
        studentvisa_details: visa,
        shorts,
        testimonial,
        chat,
        sliders,
        adsliders: adSliders,
        blog,
        services,
        contacts,
    };
}

export async function getDestinations() {
    return {
        destinations_image_path: imagePath("destinations/"),
        destinations: await query(
            "SELECT id, country, flag, image FROM tb_destinations WHERE status = '1' ORDER BY `order` ASC"
        ),
    };
}

export async function getDestinationDetails(input) {
    const id = toId(input.id);
    const uid = input.uid ?? "";
    const isGermany = id === "6";

    const [
        data,
        attractions,
        destinations,
        links,
        faq,
        universities,
        pathways,
        youtube,
        visa,
        shorts,
        testimonial,
        countrySliders,
    ] = await Promise.all([
        query("SELECT * FROM tb_destinations WHERE id = ?", [id]),
        query("SELECT * FROM tb_des_attractions WHERE d_id = ? ORDER BY `order` ASC", [id]),
        query("SELECT id, country, flag, image FROM tb_destinations ORDER BY `order` ASC"),
        query("SELECT * FROM tb_country_slider WHERE d_id = ? AND status = '1'", [id]),
        query("SELECT * FROM tb_country_faq WHERE d_id = ? ORDER BY `order` ASC", [id]),
        query("SELECT id, d_id, name, location, logo FROM tb_universities WHERE d_id = ? AND status = '1' ORDER BY `order` ASC", [id]),
        isGermany
            ? query("SELECT * FROM tb_home_tile WHERE status = '1' ORDER BY `order` ASC")
            : Promise.resolve(null),
        query("SELECT * FROM tb_german_links WHERE homeid = ? AND type = 'country'", [id]),
        query("SELECT * FROM tb_visa_approved WHERE link = ? ORDER BY id ASC", [id]),
        query("SELECT * FROM tb_shorts WHERE status = '1' AND type = 'student' AND country = ?", [id]),
        // The Laravel API always showed the Germany testimonials here.
        query("SELECT * FROM tb_testimonial WHERE did = '6' ORDER BY created_at DESC"),
        query("SELECT * FROM tb_sliders WHERE status = '1' AND link = ?", [id]),
    ]);

    // View tracking, as before. A failure here must not break the page.
    query(
        "INSERT INTO tb_insight_destination (did, uid, date) VALUES (?, ?, ?)",
        [id, String(uid), today()]
    ).catch((error) => {
        console.error("Destination insight insert failed:", error.message);
    });

    const response = {
        destinations_image_path: imagePath("destinations/"),
        pathway_image_path: imagePath(""),
        universities_image_path: imagePath("university/"),
        maincourse_image_path: imagePath("icons/"),
        thumb_image_path: imagePath("shorts/"),
        testimonial_path: imagePath("testimonial/"),
        slider_image_path: imagePath("slider/"),
        data,
        attractions,
        destinations,
        links,
        faq,
        universities,
        pathway_status: isGermany,
    };

    if (isGermany) {
        response.pathways = pathways;
    }

    return {
        ...response,
        youtube,
        visa_image_path: imagePath("visa/"),
        visa,
        shorts,
        testimonial,
        sliders_country: countrySliders,
    };
}

/*
 * Fixed "related programmes" and section titles per German programme,
 * exactly as hard-coded in the Laravel API.
 */
const RELATED = {
    ausbildung: ["2", "Ausbildung", "realausbildung.png"],
    fsj: ["6", "FSJ", "realfsj.png"],
    bachelors: ["3", "Bachelor’s", "realbachelors.png"],
    weiterbildung: ["9", "Weiterbildung", "realWeiterbildung.jpg"],
    duales: ["5", "Duales Studium", "realduals.png"],
    masters: ["7", "Master’s", "realmasters.png"],
    phd: ["8", "PhD", "realphd.png"],
    studienkollegs: ["10", "Studienkollegs", "realStudienkollegs.jpg"],
    none: ["", "", ""],
};

const HOME_TILE_LAYOUT = {
    1: { streams: false, related: ["ausbildung", "fsj", "bachelors"] },
    2: { streamTitle: "POPULAR AUSBILDUNG FIELDS", related: ["weiterbildung", "duales", "bachelors"] },
    3: { stipendTitle: "TUITION & PART-TIME WORK", streamTitle: "POPULAR FIELDS", related: ["masters", "phd", "duales"] },
    4: { streamTitle: "WORK SECTORS", related: ["ausbildung", "studienkollegs", "bachelors"] },
    5: { streamTitle: "WORK SECTORS", stipendTitle: "SALARY", related: ["weiterbildung", "none", "phd"] },
    6: { streamTitle: "WORK SECTORS", related: ["ausbildung", "studienkollegs", "bachelors"] },
    7: { stipendTitle: "TUITION & PART-TIME WORK", streamTitle: "POPULAR FIELDS", related: ["phd", "duales", "weiterbildung"] },
    8: { stipendTitle: "RESEARCH FUNDING", streamTitle: "POPULAR FIELDS", related: ["none", "none", "none"] },
    9: { streams: false, stipendTitle: "STIPEND", related: ["bachelors", "masters", "duales"] },
    10: { streamTitle: "STUDY STREAMS ", stipendTitle: "DURATION", related: ["ausbildung", "bachelors", "duales"] },
};

export async function getHomeTileDetails(input) {
    const id = toId(input.id);
    const layout = HOME_TILE_LAYOUT[id];
    const hasStreams = Boolean(layout) && layout.streams !== false;

    const [data, details, benefit, stipend, eligibility, roadmap, youtube, streams] =
        await Promise.all([
            query("SELECT * FROM tb_home_tile WHERE id = ?", [id]),
            query("SELECT * FROM tb_hometile_details WHERE homeid = ? AND status = '1' ORDER BY `order` ASC", [id]),
            query("SELECT * FROM tb_german_details WHERE homeid = ? AND status = '1' AND type = 'benefit' ORDER BY `order` ASC", [id]),
            query("SELECT * FROM tb_german_details WHERE homeid = ? AND status = '1' AND type = 'stipend' ORDER BY `order` ASC", [id]),
            query("SELECT * FROM tb_german_details WHERE homeid = ? AND status = '1' AND type = 'eligibility' ORDER BY `order` ASC", [id]),
            query("SELECT * FROM tb_german_roadmap WHERE homeid = ? AND status = '1'", [id]),
            query("SELECT * FROM tb_german_links WHERE homeid = ? AND type = 'german'", [id]),
            hasStreams
                ? query("SELECT * FROM tb_ausbildung WHERE homeid = ?", [id])
                : Promise.resolve(""),
        ]);

    const related = (layout?.related ?? ["none", "none", "none"]).map(
        (key) => RELATED[key]
    );

    const response = {
        icons_image_path: imagePath("icons/"),
        slider_image_path: imagePath(""),
        thumb_image_path: imagePath("shorts/"),
        data,
        benefit,
        stipendtitle: layout?.stipendTitle ?? "STIPEND",
        stipend,
        eligibility,
        roadmap,
        streamstatus: hasStreams ? "true" : "false",
        streams,
    };

    if (hasStreams) {
        response.streamtitle = layout.streamTitle;
    }

    related.forEach(([relatedId, name, image], index) => {
        const n = index + 1;
        response[`related${n}_id`] = relatedId;
        response[`related${n}_name`] = name;
        response[`related${n}_image`] = image;
    });

    response.youtube = youtube;
    response.details = details;

    return response;
}

export async function getServices() {
    return {
        services_image_path: imagePath("services/"),
        status: true,
        services: await query(
            "SELECT * FROM tb_services WHERE status = '1' ORDER BY `order` ASC"
        ),
    };
}

export async function getTestimonial() {
    return {
        testimonial: await query(
            "SELECT * FROM tb_testimonial WHERE status = '1' ORDER BY created_at DESC"
        ),
    };
}

export async function getWebBlogs() {
    return {
        blog_image_path: imagePath("blog/"),
        blog: await query("SELECT * FROM tb_blog_web"),
    };
}

export async function getWebBlogDetail(input) {
    return {
        blog_image_path: imagePath("blog/"),
        blog: await query("SELECT * FROM tb_blog_web WHERE id = ?", [toId(input.id)]),
    };
}

export async function getCommunityPosts(input) {
    const offset = Math.max(0, Number.parseInt(input.offset, 10) || 0);
    const nextoffset = offset + 6;

    const posts = await query(
        `SELECT p.*, s.name, s.gender
         FROM tb_community_post p
         JOIN tb_students s ON s.id = p.uid
         WHERE p.status = '1'
         ORDER BY p.created_at DESC
         LIMIT 6 OFFSET ?`,
        [offset]
    );

    if (posts.length > 0) {
        return {
            post_image_path: imagePath("community/"),
            status: true,
            posts,
            nextoffset,
        };
    }

    return { status: false, nextoffset };
}

export async function getMainCourses() {
    return {
        maincourse_image_path: imagePath("courses/"),
        maincourse: await query(
            "SELECT * FROM tb_main_course WHERE status = '1' ORDER BY `order` ASC"
        ),
    };
}
