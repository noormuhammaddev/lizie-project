const HeaderBanner = (props) => {
  return (
    <header className="container px-6 py-10 mx-auto">
      <div className="flex flex-col lg:grid lg:grid-cols-12 rounded-lg overflow-hidden">
        <div className="md:col-span-6 lg:col-span-5 relative">
          <img src={props.img} alt="Interior de una casa acogedora" className="object-cover w-full h-60 lg:absolute lg:h-full" />
        </div>
        
        <div className="header-card-bg md:col-span-6 lg:col-span-7 p-6 md:p-12 xl:p-16">
          <h1 className="text-black mb-4 max-w-md">{props.title}</h1>

          <p className="subtitle text-black4">{props.texto}</p>

          <div>{props.extraElement}</div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBanner;
