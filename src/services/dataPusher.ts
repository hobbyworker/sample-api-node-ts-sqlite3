import { createItem } from '../models/item.model';

// Periodically insert data every 10 seconds
export function startDataPusher(): void {
  setInterval(async () => {
    try {
      const randomNum = Math.floor(Math.random() * 1000);
      const itemName = `AutoItem-${randomNum}`;
      const description = `Automatically inserted item at ${new Date().toISOString()}`;

      const newItem = await createItem(itemName, description);
      console.log('Periodic data insertion completed:', newItem);
    } catch (err) {
      console.error('Error during periodic data insertion:', err);
    }
  }, 10000);
}
