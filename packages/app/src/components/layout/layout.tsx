import { useContext, useEffect, FunctionComponent } from 'react';
import NextLink from 'next/link';
import { AppBar, Toolbar, Link, Avatar } from '@material-ui/core';
import UserContext from "../../user-context";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
    minHeight: 36,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
  gap: {
    flexGrow: 1,
  },
  avatar: {
    height: 24,
    width: 24,
    fontSize: '14px',
    backgroundColor: 'teal',
  }
}));

const MainAppBar: FunctionComponent = ({}) => {
  const classes = useStyles();
  return (
    <AppBar
        position="static"
        color="default"
        elevation={1}
        className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <NextLink href="/">
          <Link
            href="/"
            variant="h6"
            color="inherit"
            noWrap
          >
            RESOURCES.CO
          </Link>
        </NextLink>
        <div className={classes.gap}></div>
        <Avatar className={classes.avatar}>YN</Avatar>
      </Toolbar>
    </AppBar>
  )
}

const Layout: FunctionComponent = ({children}) => {
  const { state: { loggedIn }, client } = useContext(UserContext)!;

  useEffect(() => {
    (async () => {
      await client.fetch('/sessions/current');
    })();
  }, [loggedIn])

  return <>
    { loggedIn && <MainAppBar /> }
    {children}
  </>
};

export default Layout;