import React from "react";
import displace from "displacejs";

import config from "../config";

function Child({ match }) {
  const getDragged = event => {
    console.log(document.querySelector("body"));
    const element = event.target.closest(".Child__title");
    const parentElem = event.target.closest(`.Child__container`);
    const options = {
      // constrain: true,
      handle: element,
      relativeTo: document.querySelector("body")
    };

    displace(parentElem, options);
  };

  const child = Object.keys(config.child).filter(
    item => item === match.params.id
  );
  // console.log(Object.keys(config.child));
  // console.log(config.child[child[0]]);
  return (
    <div>
      <h3>ID: {match.params.id}</h3>

      <div>
        <div className="Child">
          {config.child[child[0]].map(item => {
            // console.log(item.tech);
            return (
              <div
                key={item.title}
                className={`Child__container Child__${item.title}`}
                draggable="true"
              >
                <div
                  className="Child__title"
                  onMouseOver={event => getDragged(event)}
                >
                  <h1>{item.title}</h1>
                </div>
                {item.text ? (
                  <div className="Child__text">
                    <p>{item.text}</p>
                  </div>
                ) : item.tech ? (
                  <ul>
                    {item.tech.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : item.projects ? (
                  <div className="container Child__project">
                    {item.projects.map(project => (
                      <div key={project.name} className="Child__box">
                        <a href={project.src} target="_blank">
                          <img
                            src="https://www.yrstruly.uk/wp-content/themes/yrstruly/dist/images/projectico/movie2-yellow.svg"
                            alt={project.name}
                          />
                          <span>{project.name}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Child;
