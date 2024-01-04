import { getProjects } from "@core/modules/projects/api";
import ListItem from "@design/List/ListItem";
import DataListView from "@shared/Data/DataListView";
import { useRouter } from "expo-router";

const ProjectsScreen = () => {
  const router = useRouter();

  return (
    <DataListView
      method={getProjects}
      name={["projects"]}
      emptyTitle="Nog geen project"
      emptyDescription="Maak nu je eerste project aan"
      emptyIcon="folder"
      onAddItem={() => {}}
      renderItem={({ item }) => (
        <ListItem
          title={item.name}
          onPress={() => router.push(`/projects/:id, ${item.id}`)}
        />
      )}
    />
  );
};

export default ProjectsScreen;