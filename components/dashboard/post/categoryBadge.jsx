import React, { useState } from "react";
import { Badge, Tooltip } from "reactstrap";

export const CategoryBadge = ({ catid1, catid2, catid3, info }) => {
  const [infoTooltip, setInfoTooltip] = useState(false);
  const toggle = () => setInfoTooltip(!infoTooltip);
  return (
    <>
      {catid1 && catid1 !== null ? (
        <Badge color="primary">{catid1.name}</Badge>
      ) : (
        <></>
      )}
      {catid2 && catid2 !== null ? (
        <Badge color="secondary">{catid2.name}</Badge>
      ) : (
        <></>
      )}
      {catid3 && catid3 !== null ? (
        <Badge color="light">{catid3.name}</Badge>
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
