import { itemsFooter, itemsFooter2 } from './FooterItem'

import './footer.scss'

export default function Footer() {

  return (
    <div className="footer">
      <ul className="footer__list_first-line">
        {itemsFooter.map((item, index) =>
        <li className="footer__list_first-line_item" key={index}>{item}</li>)}
      </ul>
      <ul className="footer__list_second-line">
      {itemsFooter2.map((item, index) =>
        <li className="footer__list_second-line_item" key={index}>{item}</li>)}
      </ul>
    </div>
  )
}
