import type { NewsProps } from "../../types/types";


function Home({ news,loading = false }: NewsProps) {
  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Fetching news...
      </div>
    );
  }
  
  
  if (!Array.isArray(news) || news.length < 7) {
     return null;
    
  }
  

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      <section className="bg-white p-5 rounded-lg shadow w-full lg:w-8/12">
        <h1 className="text-blue-600 text-2xl font-semibold mb-2">
          Top Stories
        </h1>
        <hr className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {news[1]?.url && news[1]?.urlToImage && ( <a
            href={news[1]?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:shadow transition p-2"
          >
            <img
              src={news[1]?.urlToImage}
              alt=""
              className="w-full h-44 object-cover rounded-lg mb-2"
            />
            <h2 className="text-sm text-gray-600 font-semibold">
              {news[1]?.source?.name?.toUpperCase()}
            </h2>
            <p className="text-lg font-medium hover:underline">
              {news[1]?.title}
            </p>
          </a>)}

          <div className="flex flex-col gap-4">
            {[0, 2, 3].map((index) => (
              <div key={index}>
                <h2 className="text-sm font-semibold text-gray-700">
                  {news[index]?.source?.name?.toUpperCase()}
                </h2>
                <a
                  href={news[index]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-md hover:underline text-gray-800"
                >
                  {news[index]?.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="bg-white p-5 rounded-lg shadow w-full lg:w-4/12">
        <h1 className="text-cyan-800 text-2xl font-semibold mb-2">
          Local News
        </h1>
        <hr className="mb-4" />

        {[4, 5, 6].map((index) => (
          <a
            href={news[index]?.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="flex items-center gap-4 mb-4 hover:bg-gray-50 p-2 rounded"
          >
            <div className="flex-1">
              <h2 className="font-semibold text-gray-700">
                {news[index]?.source?.name}
              </h2>
              <p className="text-sm text-gray-800">{news[index]?.title}</p>
            </div>
            <img
              src={news[index]?.urlToImage}
              alt=""
              className="w-16 h-16 object-cover rounded-lg"
            />
          </a>
        ))}
      </section>
    </div>
  );
}

export default Home;
