<x-guest-layout>
    <div>
        <div class="grid grid-cols-4 gap-5">
            @forelse ($temas as $tema)
                <div class="rounded-xl bg-gray-300 shadow p-2">
                    <p
                        class="text-white bg-gray-700 hover:bg-gray-600 cursor-pointer rounded-md text-center p-1 my-2 font-semibold">
                        {{ $tema->titulo }}
                    </p>
                </div>
            @empty
                <div class="rounded-xl bg-gray-300 shadow p-2">
                    <p
                        class="text-white bg-gray-700 hover:bg-gray-600 cursor-pointer rounded-md text-center p-1 my-2 font-semibold">
                        No hay temas
                    </p>
                </div>
            @endforelse
        </div>

        <div class="my-10">
            {{ $temas->links() }}
        </div>
    </div>
</x-guest-layout>
