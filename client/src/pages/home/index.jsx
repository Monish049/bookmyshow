import { useEffect, useState } from "react";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { getAllMovies } from "../../api/movie";
import { message, Row, Col, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import moment from "moment";
import { Layout, Menu } from "antd";
import { SetUser } from "../../redux/userSlice";
import { GetCurrentUser } from "../../api/users";


import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Header, Footer, Sider, Content } = Layout;

  const navItems = [
    { label: "Home", icon: <HomeOutlined /> },
    {
      label: "User",
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                if (user.role === "admin") {
                  navigate("/admin");
                } else if (user.role === "partner") {
                  navigate("/partner");
                } else {
                  navigate("/profile");
                }
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <span
              onClick={() => {
                console.log("clicked on logout");
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </span>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const getData = async () => {
    try {
      
      dispatch(ShowLoading());
      const response = await getAllMovies();
      console.log(response)
      // if (response.success === true) {
      if (response!=undefined) {

      if (response.success === true) {
        setMovies(response.data);
        dispatch(SetUser("User"));
      } else {
        message.success(response.message);
      }
      dispatch(HideLoading());
    }
    

    } catch (error) {
      message.error("Please reload and try again")
      console.log("Error while getting all movies", error);
      dispatch(HideLoading());
      message.error("Error while getting all movies");
    }
  };


  useEffect(() => {
    if (localStorage.getItem("token")) {
      getData();
    } else {
      navigate("/login");
    }
    
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value); //Inside out  iNsIde
    console.log("searchText", searchText);
  };
  return (
    <>
    <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu theme="dark" mode="horizontal" items={navItems}></Menu>
          </Header>

          
          <Row className="justify-content-center w-100">
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Input
            placeholder="Type here to search for movies"
            onChange={handleSearch}
            prefix={<SearchOutlined />}
          />
          <br />
          <br />
          <br />
        </Col>
      </Row>
      <Row
        className="justify-content-center"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {movies &&
          movies
            .filter((movie) =>
              movie.title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((movie) => (
              <Col
                className="gutter-row mb-5"
                key={movie._id}
                span={{
                  xs: 24,
                  sm: 24,
                  md: 12,
                  lg: 10,
                }}
              >
                <div className="text-center">
                  <img
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                    className="cursor-pointer"
                    src={movie.poster}
                    alt="Movie Poster"
                    width={200}
                    style={{ borderRadius: "8px" }}
                  />
                  <h3
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                    className="cursor-pointer"
                  >
                    {movie.title}
                  </h3>
                </div>
              </Col>
            ))}
      </Row>
        </Layout>

        
      
    </>
  );
};

export default Home;
