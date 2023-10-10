import prisma from "../utils/prisma";

async function getCouncil() {
  return await prisma.council.findMany();
}

//this function fetches data from prisma
async function getCouncilSpecifics(payload: Object) {
  return await prisma.council.findMany({ ...payload });
}

export default async function Councils() {
  //do a where clause
  const councils = await getCouncilSpecifics({
    where: { id: 11 },
  });

  // do a where clause and include foreign keys
  const councilsForeign = await getCouncilSpecifics({
    where: { id: 11 },
    include: {
      bins: true,
    },
  });

  return (
    <div>
      <h1 className="text-3xl">Councils:</h1>

      {councils.map((council) => (
        <div key={council.id}>{council.name}</div>
      ))}

      <h1 className="text-3xl">Councils:</h1>

      {councilsForeign.map((council) => (
        <div key={council.id}>
          {council.bins.map((bin) => (
            <div>{bin.type}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
