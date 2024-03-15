import FriendList from "./components/FriendList";
import SideBarMenu from "./components/SideBarMenu";
import AddNewFeed from "./components/homePage/addNewFeed/AddNewFeed";
import Feed from "./components/homePage/addNewFeed/Feed";
import WrapMainLayout from "./components/homePage/WrapMainLayout";
export default function Home() {
  return (
    <>
      <section style={{ borderRadius: "41px", backgroundColor: "#f9fafb", padding:'20px' }}>
        <div style={{ maxWidth: "660px", margin: "0 auto", width: "100%" }}>
          <AddNewFeed></AddNewFeed>
          <Feed Id={undefined}></Feed>
        </div>
      </section>
      <FriendList />
    </>
  );
}
