import { Outlet } from "react-router-dom";
import ActionsLinkList from "../../components/ActionsLink/ActionsLinkList/ActionsLinkList";

export default function Notifications () { 
const tabList = [{text : 'All', path : '/notifications'}, {text : 'Verified', path : '/notifications/verified/'}, {text : 'Mentions', path : '/notifications/mentions/'} ]    
return <section><div className="sectionSearching__header"><h2 className="sectionSearching__title">Notifications</h2></div>
    <ActionsLinkList linkList={tabList}/>
    <Outlet/>
</section>
}