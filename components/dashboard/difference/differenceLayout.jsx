import { Card, CardHeader, CardBody } from "reactstrap";
import dynamic from "next/dynamic";
const Board = dynamic(() => import("@lourenci/react-kanban"), { ssr: false });
const DifferenceLayout = ({ difference }) => {
  return (
    <>
      <Card key="pronounce-info" id="pronounce-info">
        <CardHeader>
          <h3>
            What is difference between{" "}
            {difference.lanes
              .slice(0, -1)
              .map(
                (item, i) =>
                  `${item.cards[0].wordTxt}${
                    i < difference.lanes.length - 2 ? ", " : " "
                  }`,
              )}
            and {difference.lanes[difference.lanes.length - 1].cards[0].wordTxt}
          </h3>
        </CardHeader>
        <CardBody>
          {difference ? (
            <>
              <button type="button" className="btn btn-primary">
                <i className="icon-plus"></i> Add new word
              </button>
              <div id="demo1">
                <div className="kanban-container">
                  <div className="kanban-board">
                    <main className="kanban-drag">
                      <Board
                        allowAddCard={{ on: "top" }}
                        // initialBoard={defaultboard}
                        renderCard={(
                          { title, definition, wordTxt, relatedImages },
                          { dragging },
                        ) => (
                          <div className="kanban-item" dragging={dragging}>
                            <a className="kanban-box" href="#javascript">
                              <h6>{title}</h6>
                              <h4>{wordTxt}</h4>
                              <img
                                src={relatedImages.hits[0].previewURL}
                                alt=""
                                style={{ textAlign: "center" }}
                              />
                              <hr />
                              <p>
                                <strong>Definition:</strong>{" "}
                              </p>
                              <ul className="difference-brief">
                                {definition[0].meaning.map(
                                  (item, i) =>
                                    i < definition[0].meaning.length - 1 &&
                                    item.data.map((def, j) => (
                                      <li key={def}>{def.definition}</li>
                                    )),
                                )}
                              </ul>
                              <hr />
                              <p>
                                <strong>Examples:</strong>{" "}
                              </p>
                              <ul className="difference-brief">
                                {definition[0].meaning.map(
                                  (item, i) =>
                                    i < definition[0].meaning.length - 1 &&
                                    item.data[0]?.example &&
                                    item.data[0]?.example != "" && (
                                      <li key={i}>{item.data[0]?.example}</li>
                                    ),
                                )}
                              </ul>
                              <hr />
                              <p>
                                <strong>Origin:</strong>{" "}
                              </p>
                              <ul>
                                {definition[0].meaning.map(
                                  (item, i) =>
                                    i < definition[0].meaning.length &&
                                    item.name == "Origin" && (
                                      <li key={item.name}>{item?.data}</li>
                                    ),
                                )}
                              </ul>
                              <hr />
                              <p>
                                <strong>Related Words:</strong>{" "}
                              </p>
                              {definition[0].meaning.map(
                                (item, i) =>
                                  i < definition[0].meaning.length - 1 &&
                                  item.data.map((def, j) =>
                                    def?.synonyms?.map((syn, k) => (
                                      <a className="btn btn-outline-light txt-dark related-words btn-xs">
                                        {syn}
                                      </a>
                                    )),
                                  ),
                              )}
                            </a>
                          </div>
                        )}
                      >
                        {difference}
                      </Board>
                    </main>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>Only Max 3 Word for Comparing!</>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default DifferenceLayout;
