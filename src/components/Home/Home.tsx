import type { NewsProps } from "../../types/types";
import * as S from "../../styles/sharedStyles";

function Home({ news, loading = false }: NewsProps) {
  if (loading) {
    return (
      <div className={`${S.textCenter} mt-10 ${S.textGray500}`}>
        Fetching news...
      </div>
    );
  }

  if (!Array.isArray(news) || news.length < 7) {
    return null;
  }

  return (
    <div className={`${S.flex} ${S.flexCol} ${S.lgFlexRow} ${S.gap4} ${S.p4}`}>
      {/* Top Stories */}
      <section
        className={`${S.bgWhite} ${S.p5} ${S.roundedLg} ${S.shadow} ${S.wFull} lg:w-8/12`}
      >
        <h1 className={`${S.textBlue600} ${S.text2xl} ${S.fontSemibold} mb-2`}>
          Top Stories
        </h1>
        <hr className="mb-4" />
        <div className={`${S.grid} ${S.gridCols1} ${S.mdGridCols2} ${S.gap4}`}>
          {news[1]?.url && news[1]?.urlToImage && (
            <a
              href={news[1]?.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${S.hoverShadow} ${S.transition} p-2`}
            >
              <img
                src={news[1]?.urlToImage}
                alt=""
                className={`${S.wFull} ${S.h44} ${S.objectCover} ${S.roundedLg} mb-2`}
              />
              <h2 className={`${S.textSm} ${S.textGray600} ${S.fontSemibold}`}>
                {news[1]?.source?.name?.toUpperCase()}
              </h2>
              <p className={`${S.textLg} ${S.fontMedium} hover:underline`}>
                {news[1]?.title}
              </p>
            </a>
          )}

          <div className={`${S.flex} ${S.flexCol} ${S.gap4}`}>
            {[0, 2, 3].map((i) => (
              <div key={i}>
                <h2
                  className={`${S.textSm} ${S.fontSemibold} ${S.textGray700}`}
                >
                  {news[i]?.source?.name?.toUpperCase()}
                </h2>
                <a
                  href={news[i]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${S.textMd} ${S.textGray800} hover:underline`}
                >
                  {news[i]?.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local News */}
      <section
        className={`${S.bgWhite} ${S.p5} ${S.roundedLg} ${S.shadow} ${S.wFull} lg:w-4/12`}
      >
        <h1 className={`${S.textCyan800} ${S.text2xl} ${S.fontSemibold} mb-2`}>
          Local News
        </h1>
        <hr className="mb-4" />
        {[4, 5, 6].map((i) => (
          <a
            href={news[i]?.url}
            target="_blank"
            rel="noopener noreferrer"
            key={i}
            className={`flex ${S.itemsCenter} ${S.gap4} mb-4 ${S.hoverBgGray50} ${S.p2} ${S.rounded}`}
          >
            <div className="flex-1">
              <h2 className={`${S.fontSemibold} ${S.textGray700}`}>
                {news[i]?.source?.name}
              </h2>
              <p className={`${S.textSm} ${S.textGray800}`}>{news[i]?.title}</p>
            </div>
            <img
              src={news[i]?.urlToImage}
              alt=""
              className={`${S.w16} ${S.h16} ${S.objectCover} ${S.roundedLg}`}
            />
          </a>
        ))}
      </section>
    </div>
  );
}

export default Home;
