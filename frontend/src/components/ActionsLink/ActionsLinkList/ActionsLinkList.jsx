import ActionLink from "../ActionLink/ActionLink";
import "./ActionsLinkList.scss";

export default function ActionsLinkList({ linkList }) {

  return (
    <ul className="action-selector_container">
      {linkList.map((linkItem) => (
          <li key={linkItem.path} className="action-selector_item">
            <ActionLink text={linkItem.text} path={linkItem.path} />
          </li>
        )
      )}
    </ul>
  );
}
