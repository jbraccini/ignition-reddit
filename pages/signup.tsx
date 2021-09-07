import React, { useMemo, useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";

import * as Yup from "yup";

import { SIGNUP } from "../graph/mutations";
import COLORS from "../theme/colors";

import Form from "../components/Form";
import InputText from "../components/input/InputText";
import List from "../components/List";
import Link from "../components/Link";

const Login: React.FC = () => {
  const router = useRouter();
  const [signupMutation, { data, loading, error }] = useMutation(SIGNUP);
  const [authData, setAuthData] = useState();

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().min(3),
        email: Yup.string().email().required(),
        password: Yup.string().min(8),
      }),
    []
  );

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data?.signup?.token);
      localStorage.setItem("userId", jwtDecode(data?.signup?.token)?.userId);

      router.push("/");
    }
  }, [data]);

  useEffect(() => {
    if (!authData) return;
    const { name, email, password } = authData;
    signupMutation({ variables: { name, email, password } });
  }, [authData]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <div css={styles.root}>
        <div css={styles.card}>
          <List css={{ width: 300 }}>
            {error && <div css={styles.error}>{error.message}</div>}

            <Form onSubmit={(data) => setAuthData(data)} resolver={validationSchema}>
              <InputText model="name" label="Name" />
              <InputText model="email" label="Email" />
              <InputText model="password" label="Password" type="password" />

              <button type="submit">Sign Up</button>
            </Form>

            <div css={{ color: COLORS.white, textAlign: "center" }}>
              Already registered? <Link href="/signin">Sign In</Link>
            </div>

            <div css={{ textAlign: "center" }}>
              <Link href="/">Back</Link>
            </div>
          </List>
        </div>
      </div>
    </>
  );
};

const styles = {
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    padding: "1rem",
    backgroundColor: COLORS.lightBackground,
    width: 500,
    borderRadius: 10,
    minHeight: 500,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Login;
