export default {
    async getDocumentById(model, id, fields = null) {
        let result = await model.findById(id, fields).exec();
        if (result) {
            return result;
        } else {
            throw new Error(
                JSON.stringify({
                    status: 404,
                    message: "No such document in the database",
                })
            );
        }
    },
    
    async saveDocument(document) {
        let result = await document.save();
        if (result) {
            return result;
        } else {
            throw new Error(
                JSON.stringify({
                    status: 404,
                    message: "Failed to save document",
                })
            );
        }
    },

    async deleteDocument(model, selectors) {
        let result = await model.deleteOne(selectors);
        if (result) {
            return result;
        } else {
            throw new Error(
                JSON.stringify({
                    status: 404,
                    message: "Failed to delete document",
                })
            );
        }
    }
};
