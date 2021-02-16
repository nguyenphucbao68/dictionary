import React, { useState } from "react";
import { Badge, Tooltip } from "reactstrap";
import { CategoryName } from "./categoryName.json";

const CategoryBadge = ({ catid1, catid2, catid3, info }) => {
  const [infoTooltip, setInfoTooltip] = useState(false);
  const toggle = () => setInfoTooltip(!infoTooltip);
  return (
    <>
      {catid1 && catid1 !== null ? (
        <Badge color="primary">{CategoryName[catid1].title}</Badge>
      ) : (
        <></>
      )}
      {catid2 && catid2 !== null ? (
        <Badge color="secondary">{CategoryName[catid2].title}</Badge>
      ) : (
        <></>
      )}
      {catid3 && catid3 !== null ? (
        <Badge color="light">{CategoryName[catid3].title}</Badge>
      ) : (
        <></>
      )}
      {info && info !== null ? (
        <>
          <Badge id="source-info" color={info.color}>
            {info.title}
          </Badge>
          <Tooltip
            isOpen={infoTooltip}
            toggle={toggle}
            placement="top"
            target="source-info"
          >
            {info.tooltip}
          </Tooltip>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CategoryBadge;
