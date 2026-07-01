"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, BookOpen, ChevronRight, Tag, CheckCircle, Phone } from "lucide-react";
import { useParams } from "next/navigation";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const IMAGE_BASE = `${process.env.NEXT_PUBLIC_API_RAW_URL}/`;

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${IMAGE_BASE}${path.replace(/^\/+/, "")}`;
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/articles/${id}`);
        const data = await res.json();
        setArticle(data);
        const allRes = await fetch(`${API_BASE}/articles`);
        const allData = await allRes.json();
        const others = Array.isArray(allData)
          ? allData.filter((a) => String(a.id) !== String(id)).slice(0, 3)
          : [];
        setRelatedArticles(others);
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchArticle();
  }, [id]);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const estimateReadTime = (content) => {
    if (!content) return "3 min read";
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  // ── Banner config — desktop + mobile per article ID ──
  const bannerConfig = {
    "11": {
      desktop: "/upblog1.jpeg",
      mobile: "/mobban1.jpeg",
    },
    "7": {
      desktop: "/upblog3.jpeg",
      mobile: "/mobban2.jpeg",
    },
    "10": {
      desktop: "/upblog2.jpeg",
      mobile: "/mobban3.jpeg",
    },
  };

  const currentBanner = bannerConfig[String(id)];
  const desktopSrc = currentBanner?.desktop || getImageUrl(article?.image || article?.banner);
  const mobileSrc = currentBanner?.mobile || desktopSrc;

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 36, height: 36,
            border: "2px solid #e8f5e0",
            borderTop: "2px solid #67a139",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite"
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#67a139", fontWeight: 700 }}>
            Loading
          </p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: "0 1rem", textAlign: "center" }}>
        <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111" }}>Article not found</p>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#67a139", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>
          <ArrowLeft size={15} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        /* ── Top nav bar ── */
        .vp-topbar {
          position: sticky; top: 0; z-index: 100;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #f0f0f0;
        }
        .vp-topbar-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.85rem clamp(1rem, 5vw, 3rem);
          gap: 1rem;
        }
        .vp-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          color: #888; text-decoration: none;
          letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .vp-back:hover { color: #67a139; }

        .vp-share-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem; font-weight: 700;
          padding: 0.45rem 1rem; border-radius: 999px;
          background: #67a139; color: #fff;
          border: none; cursor: pointer;
          letter-spacing: 0.04em;
          transition: opacity 0.2s;
        }
        .vp-share-btn:hover { opacity: 0.85; }

        /* ── Hero image ── */
        .vp-hero-img {
          width: 100%;
          aspect-ratio: 16/8;
          max-height: 520px;
          position: relative;
          overflow: hidden;
          background: #f5f5f5;
        }

        /* Desktop image: visible by default, hidden on mobile */
        .vp-hero-desktop {
          display: block;
        }
        .vp-hero-mobile {
          display: none;
        }

        @media (max-width: 640px) {
          .vp-hero-img {
            aspect-ratio: 3/4;
            max-height: 480px;
          }
          .vp-hero-desktop {
            display: none;
          }
          .vp-hero-mobile {
            display: block;
          }
        }

        /* ── Article header ── */
        .vp-header {
          max-width: 1280px; margin: 0 auto;
          padding: clamp(2rem, 4vw, 3.5rem) clamp(1rem, 5vw, 3rem) 0;
        }

        .vp-brand-line {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 1.1rem;
        }
        .vp-brand-rule {
          width: 32px; height: 2px;
          background: #67a139; border-radius: 2px;
          flex-shrink: 0;
        }
        .vp-brand-label {
          font-family: 'Inter', sans-serif;
          font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.22em;
          color: #67a139;
        }

        .vp-title {
          font-family: poppins;
          font-size: clamp(1.6rem, 4.5vw, 3.2rem);
          font-weight: 800;
          color: #111;
          line-height: 1.18;
          letter-spacing: -0.01em;
          max-width: 820px;
          margin: 0 0 2rem;
        }

        /* ── Trust bar ── */
        .vp-trust-bar {
          display: flex; flex-wrap: wrap;
          align-items: stretch;
          gap: 0;
          border-top: 1px solid #ececec;
          border-bottom: 1px solid #ececec;
          margin-bottom: 0;
          max-width: 1280px;
          margin-left: auto; margin-right: auto;
        }

        .vp-trust-item {
          display: flex; flex-direction: column;
          justify-content: center;
          padding: 1.1rem clamp(1rem, 3vw, 2rem);
          border-right: 1px solid #ececec;
          flex: 1 1 auto;
          min-width: 120px;
        }
        .vp-trust-item:last-child { border-right: none; }

        .vp-trust-label {
          font-family: 'Inter', sans-serif;
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.18em;
          color: #bbb; margin-bottom: 0.25rem;
        }
        .vp-trust-value {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem; font-weight: 600;
          color: #222;
          display: flex; align-items: center; gap: 5px;
        }
        .vp-trust-value svg { color: #67a139; flex-shrink: 0; }

        .vp-cat-pill {
          display: inline-block;
          font-family: 'Inter', sans-serif;
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.16em;
          padding: 0.2rem 0.65rem;
          border-radius: 999px;
          background: #f0f9eb;
          color: #67a139;
          border: 1px solid #c6e8b0;
        }

        .vp-verified {
          display: flex; align-items: center; gap: 5px;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem; font-weight: 600;
          color: #67a139;
        }

        /* ── Body layout ── */
        .vp-body-wrap {
          max-width: 1280px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: clamp(2rem, 4vw, 4rem);
          padding: clamp(2rem, 4vw, 3.5rem) clamp(1rem, 5vw, 3rem);
          align-items: start;
        }
        @media (max-width: 1024px) {
          .vp-body-wrap { grid-template-columns: 1fr; }
          .vp-sidebar { order: -1; }
        }

        /* ── Prose ── */
        .vp-prose {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.93rem, 1.8vw, 1.05rem);
          color: #3a3a3a;
          line-height: 1.9;
          min-width: 0;
        }

        .vp-prose h1, .vp-prose h2, .vp-prose h3, .vp-prose h4 {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 700;
          color: #111;
          line-height: 1.25;
          margin-top: clamp(1.5rem, 3vw, 2.5rem);
          margin-bottom: 0.85rem;
          letter-spacing: -0.01em;
        }
        .vp-prose h2 {
          font-size: clamp(1.15rem, 2.5vw, 1.5rem);
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #f0f0f0;
        }
        .vp-prose h3 { font-size: clamp(1rem, 2vw, 1.2rem); }

        .vp-prose p { margin-bottom: 1.5rem; }

        .vp-prose ul {
          list-style: none; padding-left: 0; margin-bottom: 1.75rem;
        }
        .vp-prose ul li {
          position: relative; padding-left: 1.4rem;
          margin-bottom: 0.6rem; line-height: 1.75;
        }
        .vp-prose ul li::before {
          content: '';
          position: absolute; left: 0; top: 0.65em;
          width: 5px; height: 5px; border-radius: 50%;
          background: #67a139;
        }

        .vp-prose ol {
          padding-left: 1.5rem; margin-bottom: 1.75rem;
          counter-reset: ol-c; list-style: none;
        }
        .vp-prose ol li {
          counter-increment: ol-c; position: relative;
          padding-left: 0.5rem; margin-bottom: 0.6rem; line-height: 1.75;
        }
        .vp-prose ol li::before {
          content: counter(ol-c) ".";
          position: absolute; left: -1.5rem;
          color: #67a139; font-weight: 700;
          font-family: 'Inter', sans-serif;
        }

        .vp-prose a {
          color: #67a139; text-decoration: none;
          border-bottom: 1px solid #c6e8b0;
          transition: border-color 0.15s;
        }
        .vp-prose a:hover { border-color: #67a139; }

        .vp-prose strong { color: #111; font-weight: 700; }

        .vp-prose blockquote {
          margin: 2rem 0;
          padding: 1.25rem 1.5rem 1.25rem 1.75rem;
          border-left: 3px solid #67a139;
          background: #fafdf8;
          border-radius: 0 8px 8px 0;
          color: #555;
          font-style: italic;
          font-size: clamp(0.9rem, 1.8vw, 1rem);
        }
        .vp-prose blockquote p { margin-bottom: 0; }

        .vp-prose img {
          width: 100%; height: auto;
          border-radius: 8px; margin: 2rem 0; display: block;
        }
        .vp-prose hr {
          border: none; border-top: 1px solid #f0f0f0; margin: 2.5rem 0;
        }

        /* ── Sidebar ── */
        .vp-sidebar {
          display: flex; flex-direction: column; gap: 1.25rem;
        }

        .vp-expert-card {
          border: 1px solid #ececec;
          border-radius: 12px;
          overflow: hidden;
        }
        .vp-expert-card-head {
          background: #111;
          padding: 1.25rem 1.4rem 1rem;
        }
        .vp-expert-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.2em;
          color: #67a139; margin-bottom: 0.5rem;
        }
        .vp-expert-headline {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem; font-weight: 700;
          color: #fff; line-height: 1.35;
        }
        .vp-expert-card-body {
          padding: 1.1rem 1.4rem 1.4rem;
          background: #fff;
        }
        .vp-expert-point {
          display: flex; align-items: flex-start; gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem; color: #555;
          margin-bottom: 0.6rem; line-height: 1.5;
        }
        .vp-expert-point svg { color: #67a139; flex-shrink: 0; margin-top: 1px; }
        .vp-expert-cta {
          display: flex; align-items: center; justify-content: center;
          gap: 7px; width: 100%;
          padding: 0.75rem;
          background: #67a139; color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem; font-weight: 700;
          border-radius: 8px; text-decoration: none;
          margin-top: 1rem;
          transition: opacity 0.2s;
        }
        .vp-expert-cta:hover { opacity: 0.88; }

        .vp-share-card {
          border: 1px solid #ececec; border-radius: 12px;
          padding: 1.1rem 1.4rem;
          background: #fff;
        }
        .vp-share-card-label {
          font-family: 'Inter', sans-serif;
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.18em;
          color: #bbb; margin-bottom: 0.75rem;
        }
        .vp-share-card-btn {
          display: flex; align-items: center; justify-content: center;
          gap: 7px; width: 100%;
          padding: 0.65rem;
          background: #f7f7f7; color: #333;
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem; font-weight: 600;
          border-radius: 8px; border: 1px solid #e8e8e8;
          cursor: pointer; transition: background 0.2s;
        }
        .vp-share-card-btn:hover { background: #f0f0f0; }
        .vp-share-card-btn.copied { background: #f0f9eb; color: #67a139; border-color: #c6e8b0; }

        /* ── Related articles ── */
        .vp-related {
          border-top: 1px solid #ececec;
          padding: clamp(2.5rem, 5vw, 4rem) clamp(1rem, 5vw, 3rem);
          background: #fff;
        }
        .vp-related-inner { max-width: 1280px; margin: 0 auto; }

        .vp-related-header {
          display: flex; align-items: flex-end;
          justify-content: space-between;
          margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
          flex-wrap: wrap; gap: 0.75rem;
        }
        .vp-related-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.2em;
          color: #67a139; margin-bottom: 0.35rem;
        }
        .vp-related-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.2rem, 3vw, 1.6rem);
          font-weight: 700; color: #111;
          letter-spacing: -0.01em;
        }
        .vp-view-all {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem; font-weight: 700;
          color: #67a139; text-decoration: none;
          display: flex; align-items: center; gap: 4px;
          transition: opacity 0.2s;
        }
        .vp-view-all:hover { opacity: 0.7; }

        .vp-related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) { .vp-related-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px)  { .vp-related-grid { grid-template-columns: 1fr; } }

        .vp-rel-card {
          text-decoration: none; display: block;
          border: 1px solid #ececec; border-radius: 10px;
          overflow: hidden; background: #fff;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .vp-rel-card:hover {
          box-shadow: 0 12px 36px rgba(0,0,0,0.08);
          transform: translateY(-3px);
        }
        .vp-rel-img {
          width: 100%; aspect-ratio: 16/9;
          position: relative; background: #f0f9eb;
          overflow: hidden;
        }
        .vp-rel-img img { transition: transform 0.5s ease; }
        .vp-rel-card:hover .vp-rel-img img { transform: scale(1.04); }
        .vp-rel-body { padding: 1rem 1.1rem 1.2rem; }
        .vp-rel-date {
          font-family: 'Inter', sans-serif;
          font-size: 10px; font-weight: 600;
          color: #aaa; letter-spacing: 0.06em;
          text-transform: uppercase; margin-bottom: 0.5rem;
        }
        .vp-rel-title {
          font-family: 'Playfair Display', serif;
          font-size: 0.92rem; font-weight: 700;
          color: #111; line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden; margin-bottom: 0.75rem;
          transition: color 0.2s;
        }
        .vp-rel-card:hover .vp-rel-title { color: #67a139; }
        .vp-rel-cta {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem; font-weight: 700;
          color: #67a139; display: flex; align-items: center; gap: 3px;
          letter-spacing: 0.04em;
        }

        @media (prefers-reduced-motion: reduce) {
          .vp-rel-card, .vp-expert-cta { transition: none; }
        }
      `}</style>

      <main style={{ minHeight: "100vh", background: "#fff" }}>

        {/* ══════════════════════════════
            HERO IMAGE — desktop + mobile
        ══════════════════════════════ */}
        {(article.image || article.banner || currentBanner) && (
          <div className="vp-hero-img">
            {/* Desktop banner */}
            <Image
              src={desktopSrc}
              alt={article.title}
              fill
              className="object-cover object-center vp-hero-desktop"
              sizes="100vw"
              priority
            />
            {/* Mobile banner */}
            <Image
              src={mobileSrc}
              alt={article.title}
              fill
              className="object-cover object-center vp-hero-mobile"
              sizes="100vw"
              priority
            />
          </div>
        )}

        {/* ══════════════════════════════
            ARTICLE HEADER
        ══════════════════════════════ */}
        <div className="vp-header">
          <div className="vp-brand-line">
            <div className="vp-brand-rule" />
            <span className="vp-brand-label">Vishwak Properties · Expert Insight</span>
          </div>
          <h1 className="vp-title">{article.title}</h1>
        </div>

        {/* ══════════════════════════════
            TRUST BAR
        ══════════════════════════════ */}
        <div className="vp-trust-bar">
          {article.category && (
            <div className="vp-trust-item">
              <span className="vp-trust-label">Category</span>
              <span className="vp-trust-value">
                <span className="vp-cat-pill">{article.category}</span>
              </span>
            </div>
          )}
          <div className="vp-trust-item">
            <span className="vp-trust-label">Published</span>
            <span className="vp-trust-value">
              <Calendar size={12} />
              {formatDate(article.date || article.created_at)}
            </span>
          </div>
          <div className="vp-trust-item">
            <span className="vp-trust-label">Read Time</span>
            <span className="vp-trust-value">
              <Clock size={12} />
              {estimateReadTime(article.content || article.description)}
            </span>
          </div>
          <div className="vp-trust-item">
            <span className="vp-trust-label">Content</span>
            <span className="vp-trust-value">
              <BookOpen size={12} /> Expert Article
            </span>
          </div>
          <div className="vp-trust-item" style={{ flexBasis: "auto" }}>
            <span className="vp-trust-label">Source</span>
            <span className="vp-verified">
              <CheckCircle size={13} /> Verified by Vishwak
            </span>
          </div>
        </div>

        {/* ══════════════════════════════
            BODY — prose + sidebar
        ══════════════════════════════ */}
        <div className="vp-body-wrap">

          {/* Prose */}
          <article>
            {article.content ? (
              <div className="vp-prose" dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : article.description ? (
              <div className="vp-prose"><p>{article.description}</p></div>
            ) : (
              <p style={{ color: "#aaa", fontStyle: "italic", fontFamily: "'Inter', sans-serif" }}>No content available.</p>
            )}
          </article>

          {/* Sidebar */}
          <aside className="vp-sidebar">

            <div className="vp-expert-card">
              <div className="vp-expert-card-head">
                <p className="vp-expert-eyebrow">Vishwak Properties</p>
                <p className="vp-expert-headline">Find your perfect home in Chennai</p>
              </div>
              <div className="vp-expert-card-body">
                <div className="vp-expert-point">
                  <CheckCircle size={14} />
                  <span>10+ years of Chennai real estate expertise</span>
                </div>
                <div className="vp-expert-point">
                  <CheckCircle size={14} />
                  <span>Verified listings with transparent pricing</span>
                </div>
                <div className="vp-expert-point">
                  <CheckCircle size={14} />
                  <span>Dedicated advisor from search to handover</span>
                </div>
              </div>
            </div>

            <div className="vp-share-card">
              <p className="vp-share-card-label">Share this article</p>
              <button
                onClick={handleShare}
                className={`vp-share-card-btn${copied ? " copied" : ""}`}
              >
                <Share2 size={13} />
                {copied ? "Link copied!" : "Copy link"}
              </button>
            </div>

          </aside>
        </div>

        {/* ══════════════════════════════
            RELATED ARTICLES
        ══════════════════════════════ */}
        {relatedArticles.length > 0 && (
          <section className="vp-related">
            <div className="vp-related-inner">
              <div className="vp-related-header">
                <div>
                  <p className="vp-related-eyebrow">Continue Reading</p>
                  <h2 className="vp-related-heading">More from Vishwak</h2>
                </div>
                <Link href="/#articles" className="vp-view-all">
                  View all articles <ChevronRight size={13} />
                </Link>
              </div>

              <div className="vp-related-grid">
                {relatedArticles.map((rel) => (
                  <Link key={rel.id} href={`/article/${rel.id}`} className="vp-rel-card">
                    <div className="vp-rel-img">
                      {rel.image && (
                        <Image
                          src={getImageUrl(rel.image)}
                          alt={rel.title}
                          fill
                          sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="vp-rel-body">
                      <p className="vp-rel-date">{formatDate(rel.date || rel.created_at)}</p>
                      <h3 className="vp-rel-title">{rel.title}</h3>
                      <span className="vp-rel-cta">Read article <ChevronRight size={11} /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
    </>
  );
}