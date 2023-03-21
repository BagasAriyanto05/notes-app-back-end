/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies, no-unused-vars
const { nanoid } = require('nanoid');
const notes = require('./notes');
// eslint-disable-next-line no-unused-vars
const addNoteHandler = (request, h) => {
    // eslint-disable-next-line no-unused-vars
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    // const createAt = new Date().toISOString();
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const createAt = `${dd}-${mm}-${yyyy}`;
    const updateAt = createAt;

    const newNote = {
        title, tags, body, id, createAt, updateAt,
    };

    // eslint-disable-next-line no-undef
    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'Success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahan',
    });
    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({
    status: 'Success',
    message: 'Catatan sukses ditampilkan',
    data: {
        notes,
    },
});

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'Success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'Fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updateAt = new Date().toISOString();
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt,
        };
        const response = h.response({
            status: 'Success',
            message: 'Catatan berhasil diperbarui!',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'Fail',
        message: 'Catatan gagal diperbarui',
    });
    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'Success',
            message: 'Catatan berhasil dihapus!',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'Fail',
        message: 'Catatan gagal dihapus!',
    });
    response.code(404);
    return response;
};

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
};
