import json from 'jsonfile';

const filePath = `${__dirname}/../data/users.json`;

export default async (data) => {
  const error = json.writeFileSync(filePath, data, { spaces: 2 });
  if (error) {
    return {
      status: 500,
      message: 'Error',
      error,
    };
  }
  return {
    status: 201,
    message: 'User Created Successfully',
  };
};
