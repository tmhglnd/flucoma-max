
#include <clients/nrt/CorpusClient.hpp>
#include <clients/nrt/DataSetClient.hpp>
#include <clients/nrt/LabelSetClient.hpp>
#include <clients/nrt/KDTreeClient.hpp>
#include <clients/nrt/KMeansClient.hpp>
#include <clients/nrt/KNNClasClient.hpp>
#include <clients/nrt/KNNRegClient.hpp>
#include <clients/nrt/KNNClient.hpp>
#include <clients/nrt/NormalizeClient.hpp>
#include <clients/nrt/StandardizeClient.hpp>
#include <clients/rt/AudioTransportClient.hpp>
#include <clients/nrt/NMFCrossClient.hpp>
#include "FluidMaxWrapper.hpp" //nb: this include is order-sensitive because of macro name clashes in Eigen and C74


void ext_main(void*)
{
  using namespace fluid::client;
  //makeMaxWrapper<NRTThreadedCorpus>("fluid.corpus~");
  makeMaxWrapper<NRTThreadedDataSetClient>("fluid.dataset~");
  makeMaxWrapper<NRTThreadedLabelSetClient>("fluid.labelset~");
  makeMaxWrapper<NRTThreadedKDTreeClient>("fluid.kdtree~");
  makeMaxWrapper<NRTThreadedKMeansClient>("fluid.kmeans~");
  makeMaxWrapper<NRTThreadedKNNClasClient>("fluid.knnclassifier~");
  makeMaxWrapper<NRTThreadedKNNRegClient>("fluid.knnregressor~");
  makeMaxWrapper<NRTThreadedKNNClient>("fluid.knn~");
  makeMaxWrapper<NRTThreadedNormalizeClient>("fluid.normalize~");
  makeMaxWrapper<NRTThreadedStandardizeClient>("fluid.standardize~");
  makeMaxWrapper<RTAudioTransportClient>("fluid.audiotransport~");
  makeMaxWrapper<NRTThreadedAudioTransportClient>("fluid.bufaudiotransport~");
  makeMaxWrapper<NRTNMFCrossClient>("fluid.bufnmfcross~");
}
