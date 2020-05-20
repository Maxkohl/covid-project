import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TopTenPieChart from "./TopTenPieChart";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const classes = useStyles;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: "true",
      show: null,
    };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  showTopTen = () => this.setState({ show: "top" });

  render() {
    let content = null;

    switch (this.state.show) {
      case "top":
        content = <TopTenPieChart />;
        break;
      default:
        content = <h1>Select a Chart</h1>;
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Covid-19 Information
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              <ListItem button onClick={this.showTopTen}>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="Top 10" />
              </ListItem>
              <ListItem button>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="Another Test" />
              </ListItem>
            </List>
            <Divider />
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          {content}
        </main>
      </div>
    );
  }
}

export default Sidebar;
