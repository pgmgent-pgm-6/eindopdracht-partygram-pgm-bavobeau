import { getPosts } from "@core/modules/posts/api";
import Header from "@design/Header/Header";
import PostItem from "@design/Posts/PostItem";
import StoriesList from "@design/Stories/StoriesList";
import DefaultView from "@design/View/DefaultView";
import DataListView from "@shared/Data/DataListView";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getData } from "@core/modules/data/api";

const Index = () => {
  const router = useRouter();
  const [stories, setStories] = useState<Boolean>(true);

  useEffect(() => {
    getData().then((res) => {
      if (!res) {
        setStories(true);
      }
      setStories(res.stories);
    });
  }, []);

  return (
    <>
      <DefaultView vertical={true} >
        <Header title="Partygram" icon="message-outline" iconTitle="messages" iconOnPress={() => router.push("/threads/")} style={styles.header} iconMiddle="plus" iconMiddleTitle="Create post" iconMiddleOnPress={() =>  router.push("/posts/create")} />
        {stories && (
          <StoriesList />
        )}
        <DataListView 
          method={getPosts}
          name={["posts"]}
          emptyTitle="No posts"
          emptyDescription="There are no posts yet"
          emptyIcon="image"
          onAddItem={() => router.push("/posts/create")}
          renderItem={({ item }) => <PostItem post={item} />}
        />
      </DefaultView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  header: {
    backgroundColor: "",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Index;