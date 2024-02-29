import Following from "../../page/Following";

export default function UsersFollowings () {

  return(
    <div className="sidebarWrapper">
      <h2 className="sidebar__title">Ви підписані на цих користуачів:</h2>
      <Following></Following>
    </div>
  )
}