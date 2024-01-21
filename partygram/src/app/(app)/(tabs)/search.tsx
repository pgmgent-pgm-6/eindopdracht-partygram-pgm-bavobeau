import { getPostsBySearch } from "@core/modules/posts/api";
import TextField from "@design/Form/TextField";
import SmallPost from "@design/Posts/SmallPost";
import Text from "@design/Text/Text";
import CenteredView from "@design/View/CenteredView";
import DefaultView from "@design/View/DefaultView";
import DataListView from "@shared/Data/DataListView";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

const SearchPage = () => {
  const params = useLocalSearchParams<{ q: string }>();
  const [search, setSearch] = useState(params.q);

  return (
    <DefaultView>
      <TextField
        name="search"
        value={search}
        onChangeText={(search) => {
          setSearch(search);
        }}
        placeholder="Search"
      />
      {search && search.length >= 3 ? (
        <DataListView
          method={() => getPostsBySearch(search)}
          name={["posts", search]}
          emptyDescription="There are no posts matching your search"
          renderItem={({ item }) => <SmallPost post={item} />}
          numColumns={3}
        />
      ): (
        <CenteredView>
          <Text>Search for something</Text>
        </CenteredView>
      )}
    </DefaultView>
  );
};

export default SearchPage;
