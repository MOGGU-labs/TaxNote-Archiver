import prisma from '../prisma/client';

function generateFakeUUID(index: number): string {
    return `a93d0316-3f7c-11f0-b0d0-00ff57cfc${(542 + index).toString().padStart(3, '0')}`;
    }

    async function main() {
    for (let i = 1; i <= 20; i++) {
        await prisma.clients.upsert({
        where: { id_client: i },
        update: {},
        create: {
            id_client: i,
            client_code: `CLNT-${i.toString().padStart(4, '0')}`,
            nama_client: `PT Client Example ${i}`,
            badan_usaha: `Usaha Type ${((i - 1) % 5) + 1}`,
            telp: '021-7654321',
            alamat: `Jl. Example No. ${i}`,
            npwp: `73.481.029.6-312.${(800 + i).toString().padStart(3, '0')}`,
            nkp: `1005006${(500 + i).toString().padStart(3, '0')}`,
            keterangan: 'Klien baru potensial',
            // You can add created_at and updated_at if your schema requires it
        },
        });
    }
    console.log('Seeding 20 clients completed.');
    }

    main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
