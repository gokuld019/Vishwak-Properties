{/* Left — Logo + Tagline + RERA */}
            <div className="flex-1 min-w-[260px]">
              <Image
                src="/Logo.png"
                alt="Vishwak Properties"
                width={150}
                height={75}
                className="object-contain mb-6"
              />

              {/* Tagline — only clamp() needs inline; everything else is Tailwind */}
              <h2
                className="font-semibold leading-[1.1] tracking-tight text-[#1a2e1a]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 2rem)" }}
              >
                Plots built for<br />
                <span className="text-[#67a139]">generations.</span>
              </h2>

              {/* RERA badge */}
              <div className="inline-flex items-center gap-1.5 mt-5 px-3 py-[0.3rem] rounded-full border border-[#67a139]/40 bg-[#67a139]/[0.06] text-[#67a139] text-[0.68rem] font-medium tracking-[0.14em] uppercase">
                <span className="w-[5px] h-[5px] rounded-full bg-[#67a139] animate-pulse" />
                RERA Approved
              </div>
            </div>
