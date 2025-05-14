import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./inventory.scss";
import { register } from "swiper/element/bundle";

function Inventory() {
  register();
  return (
    <div className="inventory">
      <Sidebar />
      <div className="inventoryContainer">
        <Navbar />
        <div className="bottom">
          <h1 className="title">Warehouse</h1>
          <div className="swiperContainer">
            <swiper-container>
              <swiper-slide>Slide 1</swiper-slide>
              <swiper-slide>Slide 2</swiper-slide>
              <swiper-slide>Slide 3</swiper-slide>
              ...
            </swiper-container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
