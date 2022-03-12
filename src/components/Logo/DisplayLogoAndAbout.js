import "./Logo.css";
import LunchDiningTwoToneIcon from "@mui/icons-material/LunchDiningTwoTone";
export default function DisplayLogoAndAbout() {
  return (
    <div>
      <div>
        <img className="logo" src={require("../../foodstats.jpg")} alt="logo" />
      </div>
      <div className="about-text">
        <p>
          I made this app to help anymore easily track calories and
          macronutrients.
        </p>
        <p>
          To get started, enter a food and press the{"  "}
          <LunchDiningTwoToneIcon className="mini-burger" /> to search.
        </p>
      </div>
    </div>
  );
}
