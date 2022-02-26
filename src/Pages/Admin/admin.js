import { useDispatch, useSelector } from "react-redux";
import { getAllNotValidatedChallenges } from "../../actions/challengeAction";
import Toast from "../../Components/Toast/toast";

function ChallengeRequest({ data }) {
  const includeHandler = (id) => {
    fetch("http://localhost:3001/api/challenge/validateChallenge", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Success") {
          Toast("Challenge Validated", "", "", "");
          window.location.reload(false);
        } else {
          Toast("", "Something went wrong", "", "");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteHandler = (id) => {
    fetch("http://localhost:3001/api/challenge/removeChallenge", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Success") {
          Toast("Challenge Removed", "", "", "");
          window.location.reload(false);
        } else {
          Toast("", "Something went wrong", "", "");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="container">
        <div>
          <h2>{data.name}</h2>
        </div>
        <div>
          <b>City:</b>
          {data.city}
          <br />
          <b>Locations:</b>
          <br />
          <ul style={{ listStyle: "none" }}>
            {data.locations.map((location) => (
              <li>
                📌
                <a
                  href={
                    "https://maps.google.com?q=" +
                    location.lat +
                    "," +
                    location.lng
                  }
                  target="_blank"
                >
                  {location.name}
                </a>{" "}
              </li>
            ))}
          </ul>
          <b>Description:</b>
          <br />
          {data.description}
        </div>
        <div style={{ margin: "10px" }} className="row">
          <button
            style={{ width: "20%", marginRight: "10px" }}
            className="btn btn-primary "
            onClick={(e) => includeHandler(data._id)}
          >
            Include
          </button>
          <button
            style={{ width: "20%" }}
            className="btn btn-danger"
            onClick={(e) => deleteHandler(data._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function FeedBack() {
  return (
    <div>
      <div className="container">
        <div>
          {" "}
          <h2>Issue Heading</h2>
        </div>
        <div>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
        <div style={{ margin: "10px" }} className="row">
          <button style={{ width: "20%" }} className="btn btn-primary">
            Resolved
          </button>
        </div>
      </div>
    </div>
  );
}
export default function Admin() {
  const dispatch = useDispatch();
  const getAllNotValidatedChallengesHandler = (e) => {
    e.preventDefault();
    dispatch(getAllNotValidatedChallenges());
  };
  const challenges = useSelector(
    (state) => state.getAllNotValidatedChallengesReducer
  );
  console.log(challenges);
  return (
    <div>
      <div className="container">
        <div class="accordion" id="accordionExample">
          <div style={{ border: "none" }} class="card">
            <div class="card-header" id="headingTwo">
              <h2 class="mb-0">
                <button
                  class="btn btn-link collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  onClick={getAllNotValidatedChallengesHandler}
                >
                  New Challenge Requests
                </button>
              </h2>
            </div>
            <div
              id="collapseTwo"
              class="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionExample"
            >
              <div class="card-body">
                {challenges.challenges.map((challenge) => (
                  <ChallengeRequest data={challenge} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ border: "none" }} class="card">
            <div class="card-header" id="headingThree">
              <h2 class="mb-0">
                <button
                  class="btn btn-link collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  FeedBacks
                </button>
              </h2>
            </div>
            <div
              id="collapseThree"
              class="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordionExample"
            >
              <div class="card-body">
                <FeedBack></FeedBack>
                <FeedBack></FeedBack>
                <FeedBack></FeedBack>
                <FeedBack></FeedBack>
                <FeedBack></FeedBack>
                <FeedBack></FeedBack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
