// components
import { ThemedView } from '@/components/themed-native';
import { PostCard } from '@/screens/_components';

// ----------------------------------------------------------------------

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1 items-center justify-center">
      <PostCard
        item={{
          id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
          title: 'Available! Spacious ladies-only boarding room unit',
          imageUrl: 'https://mbaling-project-api.vercel.app/assets/upload/upload_2.png',
          userId: 'f5b2a8d5-9e7c-4bfa-bb99-88c1e9c458d3',
          name: "Gania's Boarding House",
          avatarUrl:
            'https://mbaling-project-api.vercel.app/assets/avatar/demo/avatar_landlord.png',
        }}
      />
    </ThemedView>
  );
}
