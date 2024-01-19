import DefaultView from "@design/View/DefaultView";
import DataView from "@shared/Data/DataView";
import EmptyView from "@design/View/EmptyView";
import { QueryKey } from "@tanstack/react-query";
import { ListRenderItem } from "react-native";
import { FlatList } from "react-native-gesture-handler";

type Props<T> = {
  name: QueryKey;
  method: () => Promise<T[] | null>;
  emptyTitle: string;
  emptyIcon: string;
  emptyDescription: string;
  onAddItem: () => void;
  renderItem: ListRenderItem<T>;
  numColumns?: number;
  horizontal?: boolean;
}

const DataListView = <T extends { id: number }>({ name, method, emptyTitle, emptyIcon, emptyDescription, onAddItem, renderItem, numColumns = 1, horizontal = false }: Props<T>) => {
  return (
    <DataView 
      method={method} 
      name={name} 
      render={(data: T[]) => {
        if (data.length === 0) {
          return (
            <EmptyView
              title={emptyTitle}
              description={emptyDescription}
              icon={emptyIcon}
              onPress={onAddItem}
            />
          );
        }

        return (
          <DefaultView vertical={false}>
            <FlatList
              data={data}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderItem}
              numColumns={numColumns}
              horizontal={horizontal}
            />
          </DefaultView>
        )
      }} 
    />
  );
};

export default DataListView;