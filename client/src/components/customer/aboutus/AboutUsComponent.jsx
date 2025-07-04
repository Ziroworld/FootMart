import React from 'react';
import manCityImage from '../../../assets/aboutus-images/mancity.jpg';

function AboutUsComponent() {
  return (
    <section className="max-w-6xl mx-auto my-12 px-4">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Text Column */}
        <div className="flex-1">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            FootMart: Where Football Fans Shop and Connect
          </h1>
          <p className="text-lg lg:text-xl leading-relaxed mb-6">
            FootMart is a unique platform designed for football lovers, blending an online store
            with a community space. Our goal is to make it easy for fans to shop for
            high-quality football gear—like boots, jerseys, and accessories—while also
            bringing them closer to the game through live tournament updates, player profiles,
            and local event news.
          </p>
          <p className="text-lg lg:text-xl leading-relaxed mb-8">
            We created this hybrid e-commerce site to offer more than just shopping; we want to
            build a place where football enthusiasts can find great products and feel part of a
            passionate community. Whether you play, watch, or simply love football, FootMart is
            here to support your passion with convenience and connection.
          </p>
          <p className="text-lg lg:text-xl font-semibold text-center">
            Become a part of the FootMart family today and unlock the latest football insights,
            exclusive deals, and a thriving community experience.
          </p>
        </div>

        {/* Image Column */}
        <div className="flex-1">
          <img
            src={manCityImage}
            alt="Football celebration"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutUsComponent;
