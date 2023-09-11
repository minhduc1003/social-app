import FriendList from "./components/FriendList";
import SideBarMenu from "./components/SideBarMenu";
import AddNewFeed from "./components/homePage/addNewFeed/AddNewFeed";
import Feed from "./components/homePage/addNewFeed/Feed";
import WrapMainLayout from "./components/homePage/WrapMainLayout";
export default function Home() {
  return (
    <WrapMainLayout>
      <SideBarMenu />
      {/* <p style={{ height: "1000px" }}>ducdzvcc</p> */}
      <section style={{ borderRadius: "41px", backgroundColor: "#f9fafb" }}>
        <AddNewFeed></AddNewFeed>
        {Array(3)
          .fill(0)
          .map((i, index) => (
            <Feed key={index}></Feed>
          ))}
      </section>
      <FriendList />
    </WrapMainLayout>
  );
}
