import { LazyLoadImage } from "react-lazy-load-image-component";

export default function LazyLoadGameImage({ image}) {
    return (
        <LazyLoadImage
      alt="game image"
      effect="blur"
      src={image}
      wrapperProps={{
        style: { transitionDelay: "0.5s" },
        className: "w-full h-48 overflow-hidden"
      }}
      className="w-full object-cover rounded-t-2xl h-[440px]"
    />
    )
}