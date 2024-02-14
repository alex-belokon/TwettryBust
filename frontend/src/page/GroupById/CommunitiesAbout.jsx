import './CommunitiesAbout.scss';
import { useTranslation } from "react-i18next";

export default function CommunitiesAbout() {
   const { t } = useTranslation();
    return (
      <div className="communitiesAbout">
        <h1>{t("communities.rules.title")}</h1>
        <p>{t("communities.rules.context")}</p>
        <p>
          <h3>{t("communities.rules.ruleOne")}</h3>
          {t("communities.rules.contextOne")}
        </p>
        <p>
          <h3>{t("communities.rules.ruleTwo")}</h3>
          {t("communities.rules.contextTwo")}
        </p>
        <p>
          <h3>{t("communities.rules.ruleThree")}</h3>
          {t("communities.rules.contextThree")}
        </p>
        <p>
          <h3>{t("communities.rules.ruleFour")}</h3>
          {t("communities.rules.contextFour")}
        </p>
        <p>
          <h3>{t("communities.rules.ruleFive")}</h3>
          {t("communities.rules.contextFive")}
        </p>
      </div>
    );
}