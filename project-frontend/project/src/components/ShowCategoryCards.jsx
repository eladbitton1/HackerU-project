import { Fragment } from "react";



import CategoryCards from "./cards/CategoryCards";
let categories = [
  "Others",
  "Household supply",
  "Fashion",
  "Entertainment",
  "Pet supply",
  "Electronics"
];
let cardInfo = [
  {
    label: "Electronics",
    url: `/categories/${categories[5]}`,
    image: {
      url: "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/Old_Electronics_hero_1.jpg",
      alt: "Electronics Image",
    },
    description: "Shop for the latest gadgets",
  },
  {
    label: "Fashion",
    url: `/categories/${categories[2]}`,
    image: {
      url: "https://fashion-studio.co.il/wp-content/uploads/2018/04/4532524.jpg",
      alt: "Fashion Image",
    },
    description: "Shop for the latest Fashion",
  },
  {
    label: "Entertainment",
    url: `/categories/${categories[3]}`,
    image: {
      url: "https://www.pwc.com/gx/en/industries/entertainment-media/outlook/content/GEMO_2022_Report_Desktop_950x540px.png",
      alt: "Entertainment Image",
    },
    description: "Check whats new in the entertainment business ",
  },
  {
    label: "Household Supplies",
    url: `/categories/${categories[1]}`,
    image: {
      url: "https://hips.hearstapps.com/hmg-prod/images/190419-cleaning-supplies-1555622121.jpg",
      alt: "Household Supplies",
    },
    description: "Take care for your home`s needs",
  },
  {
    label: "Pet Supplies",
    url: `/categories/${categories[4]}`,
    image: {
      url: "https://cdn.w600.comps.canstockphoto.com/pet-supplies-set-illustration_csp74219625.jpg",
      alt: "Pet Supplies Image",
    },
    description: "Make your loved ones happy",
  },
  {
    label: "Others",
    url: `/categories/${categories[0]}`,
    image: {
      url: "https://www.shutterstock.com/image-vector/man-doing-shopping-vector-illustration-600w-1561615291.jpg",
      alt: "Other Categories Image",
    },
    description: "Everything you need in one place",
  },
];

const ShowCategoryCards = () => {
  
  return (
    <Fragment>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {cardInfo.map((item, i) => (
          <CategoryCards
            key={"CategoryCard" + i}
            label={item.label}
            image={item.image.url}
            desc={item.description}
            
            url={item.url}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default ShowCategoryCards;
