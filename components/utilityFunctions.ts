export const getItemById = (id: number, items: {id: number}[]) => {
    return items.find(item=>item.id===id)
  }