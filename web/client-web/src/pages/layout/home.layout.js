import { Outlet } from "react-router-dom"
import { MenuComponent } from "../../component/front/nav.component"

const HomeLayout = () =>{
    return (
        <div >
            <MenuComponent/>
            <Outlet/>
        </div>
    )
}
export default HomeLayout;