import vanillaImage from "../../../assets/service1.jpg";
import chocolateImage from "../../../assets/service2.jpg";
import strawberryImage from "../../../assets/service3.jpg";
import mintImage from "../../../assets/service4.jpg";
import cookieImage from "../../../assets/service5.jpg";
import rockyRoadImage from "../../../assets/service6.jpg";
import butterscotchImage from "../../../assets/service7.jpg";

export const PRODUCT_LIST = [
    {
        id: 1,
        name: "Classic Vanilla Bean",
        price: 12.99,
        originalPrice: 15.99,
        image: vanillaImage,
        rating: 4.8,
        reviews: 324,
        description: "Rich and creamy vanilla ice cream made with real Madagascar vanilla beans.",
        isPopular: true,
        discount: 19,
        prepTime: "Ready to serve",
        size: "1 Pint",
        category: "classic"
    },
    {
        id: 2,
        name: "Dark Chocolate Delight",
        price: 14.99,
        image: chocolateImage,
        rating: 4.9,
        reviews: 256,
        description: "Indulgent dark chocolate ice cream with Belgian chocolate chunks.",
        isPopular: true,
        prepTime: "Ready to serve",
        size: "1 Pint",
        category: "classic"
    },
    {
        id: 3,
        name: "Fresh Strawberry Swirl",
        price: 13.99,
        originalPrice: 16.99,
        image: strawberryImage,
        rating: 4.7,
        reviews: 189,
        description: "Sweet strawberry ice cream with real fruit swirls and pieces.",
        discount: 18,
        prepTime: "Ready to serve",
        size: "1 Pint",
        category: "classic"
    },
    {
        id: 4,
        name: "Mint Chocolate Chip",
        price: 15.99,
        image: mintImage,
        rating: 4.6,
        reviews: 142,
        description: "Cool mint ice cream loaded with rich chocolate chips.",
        prepTime: "Ready to serve",
        size: "1 Pint",
        category: "classic"
    },
    {
        id: 5,
        name: "Cookies & Cream Supreme",
        price: 16.99,
        image: cookieImage,
        rating: 4.8,
        reviews: 298,
        description: "Vanilla ice cream packed with chocolate cookie pieces and cream.",
        isPopular: true,
        prepTime: "Ready to serve",
        size: "1 Pint",
        category: "premium"
    },
    {
        id: 6,
        name: "Rocky Road Adventure",
        price: 17.99,
        image: rockyRoadImage,
        rating: 4.5,
        reviews: 167,
        description: "Chocolate ice cream with marshmallows, almonds, and fudge swirls.",
        prepTime: "Ready to serve",
        size: "1 Pint",
        category: "premium"
    },
    {
        id: 7,
        name: "Salted Caramel Butterscotch",
        price: 18.99,
        originalPrice: 22.99,
        image: butterscotchImage,
        rating: 4.9,
        reviews: 203,
        description: "Creamy butterscotch ice cream with salted caramel ribbons.",
        discount: 17,
        prepTime: "Ready to serve",
        size: "1 Pint",
        category: "premium"
    },
    {
        id: 8,
        name: "Seasonal Berry Blast",
        price: 19.99,
        image: strawberryImage,
        rating: 4.4,
        reviews: 89,
        description: "Limited edition mixed berry ice cream with seasonal fruit pieces.",
        prepTime: "Ready to serve",
        size: "1 Pint",
        category: "seasonal"
    }
];

export const DEFAULT_FILTERS = {
    category: '',
    priceRange: '',
    sortBy: 'name'
};