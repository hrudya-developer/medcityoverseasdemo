export default function UniversitiesFAQ({
    faqs,
  }) {
    return (
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-secondary">
              Frequently Asked Questions
            </p>
  
            <h2 className="mt-3 text-3xl font-black text-[#071641] sm:text-4xl">
              Universities Abroad FAQs
            </h2>
          </div>
  
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6"
              >
                <h3 className="text-lg font-black text-slate-950">
                  {faq.question}
                </h3>
  
                <p className="mt-3 leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }