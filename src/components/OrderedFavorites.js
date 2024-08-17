import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

const OrderedFavorites = ({ type }) => {
  const { favorites, favoritesOrder, reorderFavorites } = useContext(FavoritesContext);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(favoritesOrder[type]);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    reorderFavorites(type, items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="favorites">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {favoritesOrder[type].map((id, index) => {
              const item = favorites[type].find(fav => fav.id === id);
              return (
                <Draggable key={id} draggableId={id.toString()} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Link to={`/${type === 'actors' ? 'actor' : 'tv'}/${id}`}>
                        {item.name}
                      </Link>
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default OrderedFavorites;