import React, { useMemo, useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";

import * as Yup from "yup";

import { SIGNIN } from "../graph/mutations";
import COLORS from "../theme/colors";

import Button from "../components/Button";
import List from "../components/List";
import Form from "../components/Form";
import InputText from "../components/input/InputText";
import Link from "../components/Link";

const SignIn: React.FC = () => {
  const router = useRouter();
  const [loginMutation, { data, loading, error }] = useMutation(SIGNIN);
  const [authData, setAuthData] = useState();

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(8),
      }),
    []
  );

  useEffect(() => {
    if (data) {
      console.log(jwtDecode(data?.login?.token));
      localStorage.setItem("token", data?.login?.token);
      localStorage.setItem("userId", jwtDecode(data?.login?.token)?.userId);

      router.push("/");
    }
  }, [data]);

  useEffect(() => {
    if (!authData) return;
    const { email, password } = authData;
    loginMutation({ variables: { email, password } });
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
              <InputText model="email" label="Email" disabled={loading} />
              <InputText model="password" label="Password" type="password" disabled={loading} />

              <Button type="submit" label="Sign In" loading={loading} />
            </Form>

            <div css={{ color: COLORS.white, textAlign: "center" }}>
              Not registered? <Link href="/signup">Sign Up</Link>
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

export default SignIn;
