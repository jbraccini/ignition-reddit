import React, { useMemo, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import * as Yup from "yup";

import { POST_LINK } from "../graph/mutations";
import COLORS from "../theme/colors";

import Button from "../components/Button";
import List from "../components/List";
import Form from "../components/Form";
import InputText from "../components/input/InputText";
import Link from "../components/Link";

const Post: React.FC = () => {
  const router = useRouter();
  const [postMutation, { data, loading, error }] = useMutation(POST_LINK);
  const [postData, setPostData] = useState();

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        url: Yup.string().url().required(),
        description: Yup.string(),
      }),
    []
  );

  useEffect(() => {
    if (data) router.push("/");
  }, [data]);

  useEffect(() => {
    if (!postData) return;
    const { url, description } = postData;
    postMutation({ variables: { url, description } });
  }, [postData]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/signin");
    }
  }, []);

  return (
    <>
      <div css={styles.root}>
        <div css={styles.card}>
          <List css={{ width: 300 }}>
            {error && <div css={styles.error}>{error.message}</div>}

            <Form onSubmit={(data) => setPostData(data)} resolver={validationSchema}>
              <InputText model="url" label="URL" disabled={loading} />
              <InputText model="description" label="Description" disabled={loading} />

              <Button type="submit" label="Post Link" loading={loading} />
            </Form>
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

export default Post;
