import Header from "./Components/Layout/Header";
import Hero from "./Components/Layout/Hero";
import HomeMenu from "./Components/Layout/HomeMenu";
import SectionHeaders from "./Components/Layout/SectionHeaders";

export default function Home() {
  return (
    <>
     
      <Hero />
      <HomeMenu />


      {/* ABOUT US SECTION */}

      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={"Out story"} mainHeader={"About us"} />
        <div className="text-gray-500 flex flex-col gap-4 max-w-md mx-auto mt-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
            minima odit recusandae. Illum ipsa non repudiandae? Eum ipsam iste
            quos suscipit tempora? Aperiam esse fugiat inventore laboriosam
            officiis quam rem!
          </p>
          <p>
            At consectetur delectus ducimus est facere iure molestias obcaecati
            quaerat vitae voluptate? Aspernatur dolor explicabo iste minus
            molestiae pariatur provident quibusdam saepe?
          </p>
          <p>
            Laborum molestias neque nulla obcaecati odio quia quod reprehenderit
            sit vitae voluptates? Eos, tenetur.
          </p>
        </div>
      </section>

    {/* Contact Us Sections */}
      <section className="text-center my-8" id="contact">
        <SectionHeaders
        subHeader={"Don't hesitate"}        
        mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500"
          href="tel:+12345678911">
      + 12 345 678 911
          </a>
        </div>
      </section>

     
    </>
  );
}
