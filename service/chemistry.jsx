import Link from "next/link";

export const generateEquation = (data) => {
  var reactants = data
    .filter((item) => item.type == "r" && item.name != "")
    .map((item, i) => (i != 0 ? "+" + item.name : item.name))
    .join("");
  var s = reactants;

  s += " = ";
  var products = data
    .filter((item) => item.type == "p" && item.name != "")
    .map((item, i) => (i != 0 ? "+" + item.name : item.name))
    .join("");
  s += products;
  return (
    <Link
      href={`/chemicalequations/${reactants}/${products}`}
      onClick={() => setShowResults(false)}
    >
      <a title={s} className="dropdown-item">
        {s}
      </a>
    </Link>
  );
};
