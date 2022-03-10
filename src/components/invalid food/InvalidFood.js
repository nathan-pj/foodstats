import "./InvalidFood.css";
export default function InvalidFood({ newSearch }) {
  return <div className="invalid">{`couldn't find '${newSearch}'`}</div>;
}
