import { Component } from "react"
import { ReviewIcon } from "../../assets/icons";
import styles from "./cards.module.css"

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 19.99,
    image: "https://via.placeholder.com/350x250/0000FF/808080/?text=Product+1",
    category: "electronics",
    brand: "Brand 1",
    rating: 4.5,
    reviews: 15,
  },
  {
    id: 2,
    name: "Product 2",
    description: "Donec accumsan est ac augue varius convallis eget ut sapien.",
    price: 29.99,
    image: "https://via.placeholder.com/350x250/FF0000/808080/?text=Product+2",
    category: "clothing",
    brand: "Brand 2",
    rating: 3.8,
    reviews: 10,
  },
  {
    id: 3,
    name: "Product 3",
    description: "Pellentesque tincidunt ex lorem, ut pulvinar odio pellentesque eget.",
    price: 39.99,
    image: "https://via.placeholder.com/350x250/00FF00/808080/?text=Product+3",
    category: "beauty",
    brand: "Brand 3",
    rating: 4.2,
    reviews: 8,
  },
  {
    id: 4,
    name: "Product 4",
    description: "Quisque eget ultricies erat, vel imperdiet nisl.",
    price: 49.99,
    image: "https://via.placeholder.com/350x250/FFFF00/808080/?text=Product+4",
    category: "home",
    brand: "Brand 4",
    rating: 3.6,
    reviews: 12,
  },
  {
    id: 5,
    name: "Product 5",
    description: "Aenean euismod sagittis blandit.",
    price: 22.99,
    image: "https://via.placeholder.com/350x250/FF00FF/808080/?text=Product+5",
    category: "electronics",
    brand: "Brand 5",
    rating: 4.1,
    reviews: 6,
  },
  {
    id: 6,
    name: "Product 6",
    description: "Sed eget massa vel lectus ultricies feugiat.",
    price: 14.99,
    image: "https://via.placeholder.com/350x250/00FFFF/808080/?text=Product+6",
    category: "clothing",
    brand: "Brand 6",
    rating: 3.9,
    reviews: 9,
  },
  {
    id: 7,
    name: "Product 7",
    description: "Nam varius nec eros sit amet gravida.",
    price: 59.99,
    image: "https://via.placeholder.com/350x250/800080/808080/?text=Product+7",
    category: "beauty",
    brand: "Brand 7",
    rating: 4.8,
    reviews: 20,
  },
  {
    id: 8,
    name: "Product 8",
    description: "Praesent tempus sodales ex non laoreet.",
    price: 33.99,
    image: "https://via.placeholder.com/350x250/008000/808080/?text=Product+8",
    category: "home",
    brand: "Brand 8",
    rating: 4.0,
    reviews: 7,
  },
];


type Item = {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  brand: string
  rating: number
  reviews: number
}
type Props = {

}
type State = {
  items: Item[]
}
class Cards extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      items: products
    }
  }
  render() {
    return (
      <div className={styles.Grid}>
        {this.state.items.map(item => (
          <div className={styles.Card} key={item.id}>
            <img className={styles.Picture} src={item.image} alt={item.name} />
            <a className={styles.Category} href="/category">{item.category}</a>
            <a className={styles.Brand} href="/brand">{item.brand}</a>
            <h3 className={styles.Name}>{item.name}</h3>
            <p className={styles.Description}>{item.description}</p>
            <div className={styles.Details}>
              <span className={styles.Price}>{item.price}$</span>
              <span className={styles.Reviews}><ReviewIcon className={styles.Icon} />{item.reviews}</span>
              <span className={styles.Rating}>{item.rating}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Cards
