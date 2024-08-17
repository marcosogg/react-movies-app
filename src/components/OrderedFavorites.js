import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useFavorites } from '../context/FavoritesContext';

const OrderedFavorites = () => {
  const { favorites, setFavorites } = useFavorites();

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(favorites);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFavorites(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="favorites">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {favorites.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.title || item.name}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default OrderedFavorites;