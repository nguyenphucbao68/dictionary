import React, { useState, useEffect } from "react";
import { Box } from "react-feather";

export const SubNavToggle = ({ definition }) => {
  const [expanded, setexpanded] = useState([]);

  useEffect(() => {
    var listToggle = [];
    definition.map((item, key) => {
      if (key == 0) {
        listToggle.push({ expanded: true, isOpen: true });
      } else {
        listToggle.push({ expanded: false, isOpen: false });
      }
    });
    setexpanded(listToggle);
  }, [definition]);

  const setExpand = (key) => {
    let newData = expanded;
    for (let i = 0; i < newData.length; i++) {
      if (i != key) newData[i].expanded = false;
    }
    if (newData[key].isOpen == true) {
      newData[key].isOpen = false;
      newData[key].expanded = !newData[key].expanded;
    } else {
      newData[key].isOpen = true;
      newData[key].expanded = !newData[key].expanded;
    }
    setexpanded(newData);
  };

  // const Advance = () => {
  // 	setexpanded2(false);
  // 	if (isOpen1 === true) {
  // 		setIsOpen1(false);
  // 		setexpanded1(!expanded1);
  // 	} else {
  // 		setIsOpen1(true);
  // 		setIsOpen2(false);
  // 		setexpanded1(!expanded1);
  // 	}
  // };
  // const Tables = () => {
  // 	setexpanded1(false);
  // 	if (isOpen2 === true) {
  // 		setIsOpen2(false);
  // 		setexpanded2(!expanded2);
  // 	} else {
  // 		setIsOpen1(false);
  // 		setIsOpen2(true);
  // 		setexpanded2(!expanded2);
  // 	}
  // };

  return (
    <>
      {definition?.map((item, key) => (
        <>
          <li key={key}>
            <button
              className="btn btn-link text-muted"
              data-toggle="collapse"
              data-target={`#definition${key}`}
              onClick={() => setExpand(key)}
              aria-expanded={expanded[key]?.expanded}
              key={key}
            >
              <Box />
              <span> {item.word}</span>
            </button>
            <ul
              className={` collapse ${expanded[key]?.isOpen ? "show" : ""}`}
              id={`definition${key}`}
            >
              <li className="pl-navs-inline">
                <a href="#javascript">
                  <i className="fa fa-angle-right"></i>Scrollable
                </a>
              </li>
            </ul>
          </li>
        </>
      ))}
      {/* <li>
				<button
					className='btn btn-link text-muted'
					data-toggle='collapse'
					data-target='#advance'
					onClick={Advance}
					aria-expanded={expanded1}
				>
					<FolderPlus />
					<span> Advance</span>
				</button>
			</li>
			<li>
				<button
					className='btn btn-link text-muted'
					data-toggle='collapse'
					data-target='#advance'
					onClick={Advance}
					aria-expanded={expanded1}
				>
					<FolderPlus />
					<span> Advance</span>
				</button>
				<ul className={` collapse ${isOpen1 ? 'show' : ''}`} id='advance'>
					<li className='pl-navs-inline'>
						<a href='#javascript'>
							<i className='fa fa-angle-right'></i>Scrollable
						</a>
					</li>
					<li className='pl-navs-inline'>
						<a href='#javascript'>
							<i className='fa fa-angle-right'></i>Tree View
						</a>
					</li>
					<li className='pl-navs-inline'>
						<a href='#javascript'>
							<i className='fa fa-angle-right'></i>Rating
						</a>
					</li>
				</ul>
			</li>
			<li>
				<a href='#javascript'>
					<FileText />
					<span> Forms</span>
				</a>
			</li>
			<li>
				<button
					className='btn btn-link text-muted'
					data-toggle='collapse'
					data-target='#tabels'
					onClick={Tables}
					aria-expanded={expanded2}
				>
					<Server /> Tables
				</button>
				<ul
					className={`collapse ${isOpen2 ? 'show' : ''}`}
					id='tabels'
					data-parent='#accordionoc'
				>
					<li className='pl-navs-inline'>
						<a href='#javascript'>
							<i className='fa fa-angle-right'></i>New
						</a>
					</li>
					<li className='pl-navs-inline'>
						<a href='#javascript'>
							<i className='fa fa-angle-right'></i>Replied
						</a>
					</li>
					<li className='pl-navs-inline'>
						<a href='#javascript'>
							<i className='fa fa-angle-right'></i>Panding
						</a>
					</li>
				</ul>
			</li> */}
    </>
  );
};
