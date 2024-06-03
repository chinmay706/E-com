import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import {
  getAllUsers,
  clearErrors,
  deleteUser,
} from "../../redux/actions/userAction";
import { DELETE_USER_RESET } from "../../redux/constants/userContant";

const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteuserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.5 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.4 },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.value === "admin" ? "!text-[green]" : "!text-[red]";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              className="text-[rgba(0,0,0,0.527)] transition-all duration-500 hover:text-[tomato]"
              to={`/admin/user/${params.row.id}`}
            >
              <EditIcon />
            </Link>
            <Button
              onClick={() => deleteuserHandler(params.row.id)}
              className="text-[rgba(0,0,0,0.527)] transition-all duration-500 hover:text-[rgba(236,30,30)]"
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - ADMIN`} />
      <div className="w-[100vw] h-full max-w-full grid md:grid-cols-[1fr,5fr] grid-cols-[1fr] absolute">
        <Sidebar />
        <div className="w-[100vw] box-border bg-[white]   border-l border-solid border-[rgba(0,0,0,0.158)]    h-[100vh]">
          <h1 className="font-normal font-Roboto text-[2rem] p-[0.5rem] box-border text-[rgba(0,0,0,0.637)] transition-all duration-500 m-[2rem] text-center">
            ALL USERS
          </h1>
          <div className="h-full w-full overflow-auto">
          <div className="min-w-[950px]  md:min-w-full"  >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              className="bg-white !border-none"
             
            />
          </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
